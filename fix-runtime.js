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

    // Ensure runtime = 'edge'
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
        // Standardize to single quotes and semicolon if it makes Cloudflare happy
        content = content.replace('export const runtime = "edge"', "export const runtime = 'edge';");
        changed = true;
    }

    // Ensure dynamic = 'force-dynamic'
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
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
});
