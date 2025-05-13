
import { Request, Response, NextFunction } from 'express';
import { AuthRepository, CustomError, RegisterUserDto, RegisteUser, LoginUserDto, LoginUser } from '../../domain';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongoDB';

export class AuthController {
  //DI depnendencies Injections
  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerUser = (req: Request, res: Response, next: NextFunction) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    new RegisteUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));

  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body)
    if (error) {
      res.status(400).json({ error });
      return;
    }
    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  getUser = (req: Request, res: Response) => {
    UserModel.find()
      .then(users => res.json({
        // users,
        user: req.body.user
      }))
      .catch(() => res.status(500).json({ error: 'Internal server error' }))
  }
}