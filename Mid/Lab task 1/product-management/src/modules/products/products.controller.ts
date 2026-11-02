import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get(":id")
  async getProductById(@Param("id") id: string) {
    return await this.productsService.getProductById(Number(id));
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productsService.createProduct(dto);
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(Number(id), dto);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return await this.productsService.deleteProduct(Number(id));
  }
}
