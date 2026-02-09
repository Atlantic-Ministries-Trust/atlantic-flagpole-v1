const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file === 'page.tsx' || file === 'route.ts' || file === 'route.tsx') {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const appDir = path.join(process.cwd(), 'app');
const allFiles = getAllFiles(appDir);

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Fix the "double dynamic" conflict:
    // If we have "import dynamic from 'next/dynamic'" AND we are about to add "export const dynamic = ..."
    // we must rename the import.
    if (content.match(/import\s+dynamic\s+from\s+['"]next\/dynamic['"]/)) {
        console.log(`Renaming dynamic import in: ${filePath}`);
        content = content.replace(/import\s+dynamic\s+from\s+(['"]next\/dynamic['"])/g, 'import nextDynamic from $1');
        // Replace usages: dynamic( -> nextDynamic(
        // We use a simple regex but it should be safe for most page files
        content = content.replace(/\bdynamic\(/g, 'nextDynamic(');
        changed = true;
    }

    // 2. Ensure runtime = 'edge'
    if (!content.includes("export const runtime = 'edge'") && !content.includes('export const runtime = "edge"')) {
        const lines = content.split('\n');
        let insertIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                insertIndex = i + 1;
            }
        }
        lines.splice(insertIndex, 0, "\nexport const runtime = 'edge';");
        content = lines.join('\n');
        changed = true;
    } else if (content.includes('export const runtime = "edge"')) {
        content = content.replace('export const runtime = "edge"', "export const runtime = 'edge';");
        changed = true;
    }

    // 3. Ensure dynamic = 'force-dynamic' (careful not to add if already exists)
    if (!content.includes("export const dynamic = 'force-dynamic'") && !content.includes('export const dynamic = "force-dynamic"')) {
        const lines = content.split('\n');
        let insertIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ') || lines[i].trim().startsWith('export const runtime')) {
                insertIndex = i + 1;
            }
        }
        lines.splice(insertIndex, 0, "export const dynamic = 'force-dynamic';");
        content = lines.join('\n');
        changed = true;
    } else if (content.includes('export const dynamic = "force-dynamic"')) {
        content = content.replace('export const dynamic = "force-dynamic"', "export const dynamic = 'force-dynamic';");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
});
