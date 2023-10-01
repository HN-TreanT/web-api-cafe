import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CATEGORY_REPOSITORY } from "src/constants/repository_enum";
import { Category } from "./category.entity";
import { PagedData } from "src/models/PagedData";
import { CategoryDto } from "./dto/category-dto.dto";
@Injectable()
export class CategoryService {
  constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: typeof Category) {}

  async get(pagination: any, filter: any): Promise<PagedData<Category>> {
    const { count, rows } = await this.categoryRepository.findAndCountAll({
      where: { ...filter },
      ...pagination,
    });

    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: count,
      CanNext: pageNumber < count,
      CanBack: pageNumber > 1,
      data: rows,
    };
    return data;
  }

  async getById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id, {});
    if (!category) throw new NotFoundException({ message: "not found category", status: false });
    return category;
  }

  async create(infoCreate: CategoryDto): Promise<Category> {
    return await this.categoryRepository.create(infoCreate);
  }

  async edit(id: number, editInfo: CategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) throw new NotFoundException({ message: "not found category", status: false });
    return category.update(editInfo);
  }

  async deleteById(id: number) {
    await this.categoryRepository.destroy({ where: { id: id } });
    return true;
  }
}
