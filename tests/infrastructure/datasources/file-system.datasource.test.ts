import fs from 'fs'
import path from 'path';
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource'


describe('file-system.datasource.ts', () => { 

    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        fs.rmSync( logPath, { recursive: true, force: true } );
    })
    test('should create log files if they dont exist', () => { 
        new FileSystemDatasource();

        const files = fs.readdirSync(logPath)
        console.log(files)
        expect( files ).toEqual([
            'logs-all.log', 'logs-high.log', 'logs-medium.log' ]
        )
     });

 });