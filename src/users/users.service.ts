import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/CreateUserDto'
import { UpdateUserDto } from './dto/UpdateUserDto'
import { randomBytes } from 'crypto'
import * as shajs from 'sha.js'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) { }

  public async createUser(createUserDto: CreateUserDto): Promise<void> {
    const salt = randomBytes(4).toString('hex')
    const password = await this.hashPassword(createUserDto.password, salt)

    await this.users.insert({
      email: createUserDto.email,
      name: createUserDto.name,
      tel: createUserDto.tel,
      password,
      salt
    })
  }

  public async checkLoginClaim(email: string): Promise<boolean> {
    return await this.findUserByEmail(email) !== undefined
  }

  public async findUserByEmail(email: string, secret = false): Promise<User | undefined> {
    return await this.users.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        tel: true,
        createdAt: true,
        password: secret,
        salt: secret
      }
    }) ?? undefined
  }

  public async findAllUser(): Promise<User[]> {
    return await this.users.find()
  }

  public async findUser(id: number): Promise<User | undefined> {
    return await this.users.findOne({
      where: { id }
    }) ?? undefined
  }

  public async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.users.update(
      { id },
      updateUserDto
    )
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return shajs('SHA512').update(salt + password).digest('hex')
  }
}