import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDoc } from '../commons/schemas/user.schema';
import { PymeDoc } from '../commons/schemas/pyme.schema';
import { IUserRepository } from '../commons/interfaces';
import { generateNonce } from '../commons/helpers/generateNonce';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDoc>,
    @InjectModel('Pyme')
    private readonly pymeModel: Model<PymeDoc>,
  ) {}
  RemovePymeFromUser(userId: string, pymeId: string): Promise<UserDoc> {
    return this.userModel
      .findOneAndUpdate(
        { user_id: userId },
        { $pull: { pymes: Types.ObjectId(pymeId) } },
        { upsert: true },
      )
      .exec();
  }

  AddDefaultPyme(user_id: string, pyme_id: Types.ObjectId): Promise<UserDoc> {
    return this.userModel
      .findOneAndUpdate(
        { user_id: user_id },
        {
          $set: {
            default_pyme: pyme_id,
          },
        },
        { upsert: true },
      )
      .exec();
  }

  async HasDefaultPyme(user_id: string): Promise<boolean> {
    const user = await this.FindByUserId(user_id);
    return !!user.default_pyme;
  }

  async FindNotConfirmedUser(): Promise<UserDoc[]> {
    return this.userModel.find({ is_email_confirmed: false }).exec();
  }

  async CreateUser(
    user_id: string,
    email: string,
    first_name: string,
    last_name: string,
    roles?: Array<string>,
    profile_pic?: string,
  ): Promise<UserDoc> {
    const user = new this.userModel({
      user_id,
      email,
      username: email,
      first_name,
      last_name,
      roles,
      profile_pic,
    });
    return user.save();
  }

  async AcceptPymeInvitation(
    user_id: string,
    pyme_id: string,
  ): Promise<UserDoc> {
    return await this.userModel
      .findOneAndUpdate(
        {
          user_id: user_id,
          pymes: {
            $nin: [Types.ObjectId(pyme_id)],
          },
        },
        {
          $push: {
            pymes: Types.ObjectId(pyme_id),
          },
        },
      )
      .exec();
  }

  async ConfirmEmail(username: string): Promise<boolean> {
    const user = await this.userModel
      .findOneAndUpdate({ username: username }, { is_email_confirmed: true })
      .exec();
    return !!user;
  }

  async GenerateEmailConfirmCode(userId: string): Promise<string> {
    const randomCode = Math.floor(Math.random() * 999999) + 100000;

    await this.userModel
      .findOneAndUpdate(
        { user_id: userId },
        { email_confirmation_code: randomCode },
      )
      .exec();

    return randomCode.toString();
  }

  async IsConfirmEmailCode(username: string, code: number): Promise<boolean> {
    const user = this.userModel.findOne({
      username: username,
      email_confirmation_code: code,
    });

    return !!user;
  }

  async GenerateResetPasswordCode(
    userId: string,
    username: string,
    nonce: string,
  ): Promise<string> {
    const user = await this.userModel
      .findOneAndUpdate(
        { user_id: userId, username: username },
        { security_stamp: nonce, security_stamp_updated: new Date() },
      )
      .exec();

    return user.security_stamp;
  }

  async VerifyResetPasswordCode(
    username: string,
    nonce: string,
  ): Promise<UserDoc> {
    const user = await this.userModel
      .findOne({ username: username, security_stamp: nonce })
      .exec();
    return user;
  }

  async DeleteResetPassword(username: string): Promise<void> {
    await this.userModel
      .findOneAndUpdate(
        { username: username },
        { security_stamp: generateNonce(), security_stamp_updated: new Date() },
      )
      .exec();
  }

  async FindByUserId(user_id: string): Promise<UserDoc> {
    const user = await this.userModel.findOne({ user_id }).exec();
    return user;
  }

  async FindPymesByUserId(user_id: string): Promise<PymeDoc[]> {
    const user = await this.FindByUserId(user_id);

    let pymeFiltersBy = [];

    if (!user.pymes.length) {
      return [];
    }

    pymeFiltersBy = user.pymes.map((pyme) => {
      return { _id: pyme };
    });

    const pymes = await this.pymeModel
      .find({ $or: pymeFiltersBy }, { __v: 0 })
      .exec();
    return pymes;
  }

  async get(): Promise<UserDoc[]> {
    return await this.userModel.find({}).exec();
  }

  async getById(id: string): Promise<UserDoc> {
    return await this.userModel.findById(id).exec();
  }

  async create(doc: any): Promise<UserDoc> {
    return await this.userModel.create(doc);
  }

  async update(id: string, doc: any): Promise<UserDoc> {
    return await this.userModel.findByIdAndUpdate(id, doc).exec();
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.userModel.findByIdAndRemove(id).exec();
    return !!user;
  }
  async AddRole(user_id: string, roles: string[] | string): Promise<UserDoc> {
    const newRoles = Array.isArray(roles) ? roles : [roles];
    const user = await this.userModel.findOne({ user_id });
    const distincRoles = newRoles.filter((role) => !user.roles.includes(role));

    if (distincRoles.length) {
      user.roles = user.roles.concat(distincRoles);
      await user.save();
    }

    return user;
  }

  async RemoveRole(
    user_id: string,
    roles: string[] | string,
  ): Promise<UserDoc> {
    const newRoles = Array.isArray(roles) ? roles : [roles];
    const user = await this.userModel.findOne({ user_id });
    const distincRoles = (user?.roles || []).filter(
      (role) => !newRoles.includes(role),
    );
    if (user.roles.includes('pyme')) {
      user.roles = distincRoles;
      await user.save();
    }

    return user;
  }
}
