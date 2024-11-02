import { Body, Controller, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { InvalidCredentialsException } from 'src/global-filters/invalid-credentials.exception';
import { ExistingProductDTO } from 'src/product/dtos/existing-product.dto';
import { TradeService } from './trade.service';
import { CompleteProductDTO } from 'src/product/dtos/complete-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('trade')
@UseGuards(JwtGuard)
@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Patch('buy/:id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'User bank successfully updated',
    type: CompleteProductDTO,
  })
  @ApiBadRequestResponse({ description: 'Error! could not update user bank' })
  async buyProduct(
    @Param('id') id: string,
    @Body() productTitle: Partial<ExistingProductDTO>,
  ): Promise<CompleteProductDTO> {
    try {
      const check = await this.tradeService.buyProduct(id, productTitle);
      console.log(check);
      return check;
    } catch (e) {
        throw new Error("Insufficient Balance! / Invalid Credentials");
    }
  }

  @Patch('sell/:id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'User bank successfully updated' })
  @ApiBadRequestResponse({ description: 'Error! could not update user bank' })
  async sellProduct(
    @Param('id') id: string,
    @Body() productTitle: Partial<ExistingProductDTO>,
  ): Promise<number> {
    try {
      return await this.tradeService.sellProduct(id, productTitle);
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }
}
