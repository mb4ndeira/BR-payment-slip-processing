import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConsultPaymentSlipResponseDTO {
  @ApiProperty()
  barCode: string;

  @ApiPropertyOptional()
  amount?: string;

  @ApiPropertyOptional()
  expirationDate?: string;
}
