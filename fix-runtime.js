const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, fileName, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, fileName, arrayOfFiles);
        } else {
            if (file === fileName) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const appDir = path.join(process.cwd(), 'app');
const pages = getAllFiles(appDir, 'page.tsx');
const routes = getAllFiles(appDir, 'route.ts');
const routeTsx = getAllFiles(appDir, 'route.tsx');

const allFiles = [...pages, ...routes, ...routeTsx];

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('export const runtime = "edge"') && !content.includes("export const runtime = 'edge'")) {
        // Add it after the imports or at the top
        const lines = content.split('\n');
        let insertIndex = 0;

        // Find last import
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                insertIndex = i + 1;
            }
        }

        lines.splice(insertIndex, 0, '\nexport const runtime = "edge"');
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log(`Updated: ${filePath}`);
    }
});
