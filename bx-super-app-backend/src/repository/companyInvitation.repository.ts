import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  InvitationStatus,
  CompanyInvitation,
  InvitationType,
} from './../commons/schemas/invitation.schema';
import { ICompanyInvitationRepository } from './../commons/interfaces/repository/ICompanyInvitationRepository.interface';
export class CompanyInvitationRepository
  implements ICompanyInvitationRepository {
  constructor(
    @InjectModel('CompanyInvitation')
    private readonly companyInvitationModel: Model<CompanyInvitation>,
  ) {}
  async findById(invitation_id: string): Promise<CompanyInvitation> {
    return await this.companyInvitationModel.findById(invitation_id).exec();
  }
  async findByPymeEmailAndStatus(
    pyme_id: string,
    email: string,
    status: InvitationStatus,
    invitationType: InvitationType,
  ) {
    return await this.companyInvitationModel
      .findOne({
        email,
        status,
        pyme_id,
        invitationType,
      })
      .exec();
  }
  async findByIdAndStatus(
    invitation_id: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation> {
    return await this.companyInvitationModel
      .findOne({
        _id: invitation_id,
        status,
      })
      .exec();
  }
  async deleteById(invitation_id: string): Promise<CompanyInvitation> {
    return await this.companyInvitationModel
      .findOneAndDelete({
        _id: invitation_id,
      })
      .exec();
  }
  async addInvitation(
    pyme_id: string,
    pyme_name: string,
    email: string,
    status: InvitationStatus,
    invitationType: InvitationType,
  ): Promise<CompanyInvitation> {
    return await this.companyInvitationModel.create({
      pyme_id: pyme_id,
      pyme_name: pyme_name,
      email: email,
      status: status,
      invitationType: invitationType,
    });
  }
  async updateInvitation(
    invitation_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation> {
    const companyInvitation = await this.companyInvitationModel
      .findOneAndUpdate(
        { _id: invitation_id, email: email },
        { status: status },
        { new: true },
      )
      .exec();
    return companyInvitation;
  }
  async findByStatus(
    invitation_id: string,
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation> {
    return await this.companyInvitationModel.findOne({
      _id: invitation_id,
      email: email,
      status: status,
    });
  }

  async findAllByEmailAndStatus(
    email: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation[]> {
    return await this.companyInvitationModel.find({
      email: email,
      status: status,
    });
  }

  async findAllByPymeIdAndStatus(
    pyme_id: string,
    status: InvitationStatus,
  ): Promise<CompanyInvitation[]> {
    return await this.companyInvitationModel.find({
      pyme_id,
      status,
    });
  }

  async findAllByPymeAndStatus(
    pyme_id: string,
    status: InvitationStatus,
    type: InvitationType,
  ): Promise<CompanyInvitation[]> {
    return await this.companyInvitationModel.find({
      pyme_id: pyme_id,
      status: status,
      invitationType: type,
    });
  }
}
