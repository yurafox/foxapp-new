import {User} from '../../../model/index';
import {LoginTemplate} from "../../../model/index";

export abstract class AbstractAccountRepository {
  public async abstract register(user: User): Promise<User>;
  public async abstract edit(user: User, token: string): Promise<User>;
  public async abstract logIn(email: string, password: string): Promise<LoginTemplate>;
  public async abstract getUserById(id: number , token: string): Promise<User>
  public abstract isNotSignOutSelf(): boolean;
}
