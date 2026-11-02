import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getEmployees() {
    return await this.employeesService.getEmployees();
  }

  @Get(":id")
  async getEmployeeById(@Param("id") id: string) {
    return await this.employeesService.getEmployeeById(Number(id));
  }

  @Post()
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    return await this.employeesService.createEmployee(dto);
  }

  @Patch(":id")
  async updateEmployee(
    @Param("id") id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return await this.employeesService.updateEmployee(Number(id), dto);
  }

  @Delete(":id")
  async deleteEmployee(@Param("id") id: string) {
    return await this.employeesService.deleteEmployee(Number(id));
  }
}
