import { AppError } from './../../../../shared/errors/AppError';
import { IGetStatementOperationDTO } from './../getStatementOperation/IGetStatementOperationDTO';
import { StatementsRepository } from './../../repositories/StatementsRepository';
import { IStatementsRepository } from './../../repositories/IStatementsRepository';
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_to_id: string;
  amount: number;
  description: string;
  id_sender: string;
}


@injectable()
export class TransferMoneyToUserUseCase {

  constructor(
    @inject('StatementsRepository')
    private StatementsRepository: IStatementsRepository

  ) { }

  async execute({ user_to_id, amount, description, id_sender }: IRequest) {

    let balance = await this.StatementsRepository.getUserBalance({ user_id: id_sender, with_statement: true })

    if (balance.balance < amount) {
      const newLocal = 'Balance not suficient';
      throw new AppError(newLocal);
    }

    let statement = await this.StatementsRepository.createTransfer({
      user_to_id,
      amount,
      description,
      id_sender
    })

    return statement;


  }
}
