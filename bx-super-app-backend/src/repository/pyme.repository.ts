import {
  BillingInformation,
  ConfirmPymeEnum,
} from './../commons/schemas/pyme.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPymeRepository } from '../commons/interfaces';
import { PymeDoc, Collaborators } from '../commons/schemas/pyme.schema';
import { ValidatePymeDoc } from '../commons/schemas/validate-pyme.schema';

@Injectable()
export default class PymeRepository implements IPymeRepository {
  constructor(
    @InjectModel('Pyme')
    private readonly pymeModel: Model<PymeDoc>,
    @InjectModel('ValidatePyme')
    private readonly validatePymeModel: Model<ValidatePymeDoc>,
  ) {}
  async ResetAdmin(companyId: string, userId: string): Promise<PymeDoc> {
    const company = await this.getById(companyId);
    company.collaborators.forEach((x) =>
      x.user_id === userId ? (x.is_admin = true) : (x.is_admin = false),
    );

    return this.update(companyId, company);
  }
  async IsAdmin(pyme_id: string, user_id: string): Promise<boolean> {
    const company = await this.getById(pyme_id);
    return company.collaborators.some((c: Collaborators) => {
      return c.user_id === user_id && c.is_admin;
    });
  }
  async UserExistInPyme(companyId: string, userId: string): Promise<boolean> {
    const company = await this.pymeModel
      .findOne({
        _id: companyId,
        collaborators: {
          $elemMatch: {
            user_id: userId,
          },
        },
      })
      .exec();
    if (company) {
      return true;
    } else {
      return false;
    }
  }
  async UpdateConfirmPymeBilling(
    pymeId: string,
    status: ConfirmPymeEnum,
    current_account?: string,
    office?: string,
    customerType?: string,
  ): Promise<PymeDoc> {
    const pyme = await this.getById(pymeId);
    pyme.has_billing_information_confirmed = status;

    const billing_information = pyme.billing_information;

    billing_information.current_account = current_account
      ? current_account
      : billing_information.current_account;

    billing_information.office = office ? office : billing_information.office;

    billing_information.client_type = customerType
      ? customerType
      : billing_information.client_type;

    return this.update(pymeId, pyme);
  }
  async RemoveCollaborator(pymeId: string, userId: string): Promise<PymeDoc> {
    return this.pymeModel
      .findOneAndUpdate(
        { _id: pymeId },
        { $pull: { collaborators: { user_id: userId } } },
        { upsert: true },
      )
      .exec();
  }

  async RegisterPymeV2(pymeInput: {
    social_reason: string;
    email?: string;
    collaborators: Array<{
      user_id: string;
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
      is_admin: boolean;
    }>;
    rut?: string;
    shipping_average_weight?: string;
    shipping_type?: string;
    collaborator_quantity: string;
    shipping_quantity: string;
    other_type?: string;
    business_clasification: string;
    is_natural_person?: boolean;
  }): Promise<PymeDoc> {
    return this.pymeModel.create<{
      social_reason: string;
      email?: string;
      collaborators: Array<{
        user_id: string;
        status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
        is_admin: boolean;
      }>;
      rut?: string;
      shipping_average_weight?: string;
      shipping_type?: string;
      collaborator_quantity: string;
      shipping_quantity: string;
      other_type?: string;
      business_clasification: string;
      is_natural_person?: boolean;
    }>(pymeInput);
  }

  async RegisterPyme(pymeInput: {
    social_reason: string;
    email?: string;
    collaborators: Array<{
      user_id: string;
      status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
      is_admin: boolean;
    }>;
    rut?: string;
  }): Promise<PymeDoc> {
    return this.pymeModel.create<{
      social_reason: string;
      email?: string;
      collaborators: Array<{
        user_id: string;
        status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
        is_admin: boolean;
      }>;
      rut?: string;
    }>(pymeInput);
  }

  async JoinToPyme(
    social_reason: string,
    collaborators: any,
  ): Promise<PymeDoc> {
    return this.pymeModel
      .findOneAndUpdate(
        {
          social_reason: social_reason,
        },
        {
          $push: { collaborators },
        },
      )
      .exec();
  }

  async getPymeCollaborators(pyme_id: string): Promise<Array<Collaborators>> {
    const pyme = await this.pymeModel.findById(pyme_id).exec();
    return pyme.collaborators;
  }

  async create(doc: PymeDoc): Promise<PymeDoc> {
    return this.pymeModel.create(doc);
  }

  async get(): Promise<PymeDoc[]> {
    return this.pymeModel.find({}).exec();
  }

  async getById(id: string): Promise<PymeDoc> {
    return this.pymeModel.findById(id).exec();
  }

  async update(id: string, doc: PymeDoc): Promise<PymeDoc> {
    return this.pymeModel.findByIdAndUpdate(id, doc, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const pyme = await this.pymeModel.findByIdAndRemove(id).exec();
    return !!pyme;
  }

  async GetPymeByRut(pymeRut: string): Promise<PymeDoc> {
    return this.pymeModel
      .findOne({
        rut: pymeRut,
      })
      .exec();
  }

  async GetUserPymeInvitationByEmail(user_email: string): Promise<PymeDoc[]> {
    return this.pymeModel
      .find({
        'collaborators.email': user_email,
      })
      .exec();
  }

  async AddCollaborators(id: string, collaborators: any): Promise<PymeDoc> {
    return this.pymeModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $push: { collaborators },
        },
      )
      .exec();
  }

  async UpdatePymeCollaboratorStatus(
    pyme_id: string,
    user_email: string,
    new_status: string,
  ): Promise<PymeDoc> {
    return this.pymeModel
      .findOneAndUpdate(
        {
          _id: pyme_id,
          'collaborators.email': user_email,
        },
        {
          $set: {
            'collaborators.$.status': new_status,
            'collaborators.$.acepted_date': new Date(),
          },
        },
      )
      .exec();
  }

  async UpdatePymeCollaborators(
    rut: string,
    collaborators: any,
  ): Promise<PymeDoc> {
    return this.pymeModel
      .findOneAndUpdate(
        {
          rut: rut,
        },
        {
          $push: { collaborators },
        },
      )
      .exec();
  }

  async SaveVerifiedPyme(
    pyme_rut: string,
    pyme: any,
  ): Promise<ValidatePymeDoc> {
    const createdVerifiedPyme = new this.validatePymeModel({
      pyme_rut,
      ...pyme,
    });

    return createdVerifiedPyme.save();
  }

  async GetVerifiedPyme(pyme_rut: string): Promise<ValidatePymeDoc> {
    return this.validatePymeModel
      .findOne({
        pyme_rut,
      })
      .exec();
  }

  async FindBySocialReason(socialReason: string): Promise<PymeDoc> {
    return this.pymeModel
      .findOne({
        social_reason: socialReason,
      })
      .exec();
  }

  async FindCollaborators(pyme_id: string): Promise<Array<Collaborators>> {
    const pyme = await this.pymeModel.findById(pyme_id).exec();
    return pyme.collaborators;
  }

  async UpdatePymeBillingInformation(
    pyme_id: string,
    billing_info: BillingInformation,
  ): Promise<PymeDoc> {
    return this.pymeModel
      .findOneAndUpdate(
        {
          _id: pyme_id,
        },
        {
          has_billing_information: true,
          billing_information: billing_info,
          has_billing_information_confirmed: ConfirmPymeEnum.IN_PROCESS,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async findPyme(find: string) {
    return this.pymeModel
      .find({ social_reason: { $regex: find, $options: 'i' } })
      .limit(10);
  }
}
