import { Injectable } from "@nestjs/common";
import { PasswordEncoder } from "./contracts/password-encoder.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncoderImpl extends PasswordEncoder{
    private readonly saltRound = 12;
    async encode(password: string): Promise<string>{
        return bcrypt.hash(password,this.saltRound);
    }

    async matches(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}

