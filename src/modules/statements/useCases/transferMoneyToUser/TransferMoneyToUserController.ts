import { TransferMoneyToUserUseCase } from './TransferMoneyToUserUseCase';
import { Request, Response } from "express";
import { container } from "tsyringe";



export class TransferMoneyToUserController {

  async execute(request: Request, response: Response) {


    const { id: id_sender } = request.user

    const { user_to_id } = request.params

    const { amount, description } = request.body


    let useCase = container.resolve(TransferMoneyToUserUseCase)

    let statement = await useCase.execute({ user_to_id, amount, description, id_sender })


    return response.status(201).json(statement)


  }


}
