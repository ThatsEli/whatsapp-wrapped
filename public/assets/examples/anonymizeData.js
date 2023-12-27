import { readdirSync, readFileSync, writeFileSync } from 'fs';

const txtFiles = readdirSync('./');
txtFiles.forEach((file) => {
    if (file.endsWith('.txt')) {
        const data = readFileSync(file, 'utf8');
        const lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if(!lines[i].startsWith('[')) {
                lines[i] = lines[i].split(' ').map((word) => 'WORD').join(' ');
                continue;
            }
            let dateTime = lines[i].split('] ')[0] + ']';
            let name = lines[i].substring(lines[i].indexOf('] ') + 2, lines[i].indexOf(': '));
            let message = lines[i].substring(lines[i].indexOf(':') + 2);
            if(name === 'A') name = 'A***:';
            if(name === 'B') name = 'B***:';
            if(name === 'C') name = 'C***:';
            if(name === 'D') name = 'D***:';
            message = message.split(' ').map((word) => 'WORD').join(' ');
            const line = `${dateTime} ${name} ${message}`;
            lines[i] = line;
        }
        const newData = lines.join('\n');
        writeFileSync(file, newData);
    }
});