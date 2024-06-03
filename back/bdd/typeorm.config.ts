import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const typeOrmConfig: TypeOrmModuleOptions = {
    //Datos de local:
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Sombra2907!',
    database: 'clinicaseprice',
    entities: [join(__dirname, '../**/**/*.entity{.ts,.js}')],
    synchronize: true,
};
export default typeOrmConfig;