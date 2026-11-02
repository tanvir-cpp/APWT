import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts() {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(dto: CreateProductDto) {
    try {
      const response = await this.productRepository.create(dto);
      return await this.productRepository.save(response);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    try {
      console.log("id", id);
      if (!id) {
        throw new NotFoundException("Product not found");
      }
      const product = await this.productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      Object.assign(product, dto);
      const { id: pid, ...rest } = product;
      await this.productRepository.update({ id: id }, rest);
      return await this.productRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      return await this.productRepository.delete({ id: id });
    } catch (error) {
      throw error;
    }
  }
}
