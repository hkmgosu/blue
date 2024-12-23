export class SaveVerifiedPymeDto {
  readonly pyme_rut: string;
  readonly rut: string;
  readonly dv: string;
  readonly social_reason: string;
  readonly start_activities: boolean;
  readonly start_date_activities: string;
  readonly foreign_currency: boolean;
  readonly pro_pyme: boolean;
  readonly activities: {
    readonly code: string;
    readonly gloss: string;
    readonly category: number;
    readonly affects: boolean;
  }[];
  readonly stamped_documents: {
    readonly document: string;
    readonly last_stamped: string;
  }[];
  readonly dte_obligation: boolean;
  readonly dte_exception: boolean;
  readonly obs: {
    readonly inconcurrent: string;
    readonly supplanted: boolean;
    readonly not_located: boolean;
    readonly giro_finished: boolean;
    readonly non_existent_address: boolean;
    readonly sporadic_activity: boolean;
    readonly non_been_address: boolean;
    readonly obligation_giro_finished: boolean;
  };
}
