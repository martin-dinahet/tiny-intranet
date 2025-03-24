import * as bcrypt from "bcryptjs";

import { BeforeInsert, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { IsStrongPassword } from "class-validator";
import { Post } from "./post";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsStrongPassword()
  password!: string;

  @Column({ default: "user" })
  permissions!: "user" | "admin";

  @OneToMany(() => Post, (post: Post) => post.user)
  posts!: Array<Post>;

  @OneToMany(() => User, (contact: User) => contact)
  contacts!: Array<User>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
