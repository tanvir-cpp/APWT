import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getEmployees() {
    try {
      const employees = await this.employeeRepository.find();
      return employees;
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(id: number) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!employee) {
        throw new NotFoundException("Employee not found");
      }
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async createEmployee(dto: CreateEmployeeDto) {
    try {
      const response = await this.employeeRepository.create(dto);
      return await this.employeeRepository.save(response);
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    try {
      console.log("id", id);
      if (!id) {
        throw new NotFoundException("Employee not found");
      }
      const employee = await this.employeeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!employee) {
        throw new NotFoundException("Employee not found");
      }
      Object.assign(employee, dto);
      const { id: eid, ...rest } = employee;
      await this.employeeRepository.update({ id: id }, rest);
      return await this.employeeRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(id: number) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!employee) {
        throw new NotFoundException("Employee not found");
      }
      return await this.employeeRepository.delete({ id: id });
    } catch (error) {
      throw error;
    }
  }
}
