import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConsultPaymentSlipResponseDTO {
  @ApiProperty()
  barcode: string;

  @ApiPropertyOptional()
  amount?: string;

  @ApiPropertyOptional()
  expirationDate?: string;
}
