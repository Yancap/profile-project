import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Migrate1696245736429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
              { name: "id", 
                type: "int", 
                isPrimary: true, 
                unsigned: true, 
                isGenerated: true, 
                generationStrategy: "increment" 
              },
              { name: "name", type: "varchar" },
              { name: "email", type: "varchar", isUnique: true },
              { name: "password", type: "varchar" },
            ] 
        }))
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
              { name: "id", 
                type: "int", 
                isPrimary: true, 
                unsigned: true, 
                isGenerated: true, 
                generationStrategy: "increment" 
              },
              { name: "photo", type: "varchar" },
              { name: "subtitle", type: "varchar"},
              { name: "likes", type: "int", default: 0, unsigned: true },
              { name: "userId", type: "int", unsigned: true,  }
            ] 
        }))  
        await queryRunner.createForeignKey("posts", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("posts");
      await queryRunner.dropTable("users");
    }

}
