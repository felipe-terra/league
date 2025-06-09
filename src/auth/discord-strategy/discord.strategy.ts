import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-discord";
import { UsersService } from "../../users/users.service";


@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
    constructor(private readonly usersService: UsersService) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ['identify', 'email', 'guilds'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const { id, email, username } = profile;
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            await this.usersService.create({
                name: username,
                email: email,
                password: `discord_${id}`,
                active: true,
            });
            user = await this.usersService.findByEmail(email);
        }
        return user?.toJSON();
      }
}