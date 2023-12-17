import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  CUSTOMER_REPOSITORY,
  INVOICE_DETAIL_REPOSITORY,
  INVOICE_REPOSITORY,
  MATERIAL_REPOSITORY,
  SHIPMENT_REPOSITORY,
  TABLEFOOD_INVOICE_REPOSITORY,
  TABLEFOOD_REPOSITORY,
} from "src/constants/repository_enum";
import { Invoice } from "./invoice.entity";
import { PagedData } from "src/models/PagedData";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { Employee } from "../employee/employee.entity";
import { Promotion } from "../promotion/promotion.entity";
import { Customer } from "../customer/customer.entity";
import { TableFoodInvoice } from "../table_food_invoice/table_food_invoice.entity";
import { FilterDto } from "./dto/filter.dto";
import { Op, Sequelize } from "sequelize";
import { OrderInvoiceDto } from "./dto/order.dto";
import { InvoiceDetail } from "../invoice_detail/invoice_detail.entity";
import { ProductServices } from "../product/product.service";
import { TableFood } from "../table_food/table_food.entity";
import { SplitInvoice } from "./dto/split-invoice.dto";
import { CombineInvoice } from "./dto/combine-invoice.dto";
import { TblInvoiceCreate } from "../table_food_invoice/dto/tbf-invoice-create";
import { TablefoodInoviceService } from "../table_food_invoice/tablefood-invoice.service";
import { TblInvoiceEdit } from "../table_food_invoice/dto/tbl-inovice-edit.dto";
import { Product } from "../product/product.entity";
import { Combo } from "../combo/combo.entity";
import { Payment } from "./dto/payment.dto";
import { format } from "date-fns";
import { UseMaterial } from "../use_material/use_material.entity";
import { DetailCombo } from "../detail_combo/detail_combo.entity";
import { Material } from "../material/material.entity";
import { raw } from "body-parser";
import { Shipment } from "../shipment/shipment.entity";
import {startOfDay, endOfDay, startOfWeek, endOfWeek , startOfMonth, endOfMonth, startOfYear, endOfYear} from "date-fns"

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: typeof Invoice,
    @Inject(INVOICE_DETAIL_REPOSITORY) private readonly invoiceDetaiRepository: typeof InvoiceDetail,
    @Inject(TABLEFOOD_INVOICE_REPOSITORY) private readonly tablefoodInvoiceRepository: typeof TableFoodInvoice,
    @Inject(TABLEFOOD_REPOSITORY) private readonly tableFoodRepository: typeof TableFood,
    @Inject(MATERIAL_REPOSITORY) private readonly materialRepository: typeof Material,
    @Inject(SHIPMENT_REPOSITORY) private readonly shipmentRepository: typeof Shipment,
    @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer,
    private readonly tableInvoiceService: TablefoodInoviceService
  ) {}

  async getDetailInvoiceByIdTable(id_table: any) : Promise<any>{
   
     const invoice = await this.invoiceRepository.findOne({
      where: {
        time_pay: null
      },
      include: [
        {
          model: Employee,
          attributes: { exclude: ["password"] },
        },
        { model: Promotion, 
        },
        {
          model: Customer,
        },
       {
        model: InvoiceDetail,
        include: [Combo, Product]
       },
       {
        model: TableFoodInvoice,
        where: {
          id_table: id_table,
          
        },
        // required:false
       },
      
       
      ]
     }).then((res: any) =>  res.dataValues)

     const invocie_tables = await this.tablefoodInvoiceRepository.findAll(
      {
        raw: true,
      
        where: {
      id_invoice: invoice.id
     }})

     if(!invoice) throw new NotFoundException({ message: "Không tìm thấy yêu cầu hợp lệ", status: false });

    //  console.log(invoice.dataValues)

     return {
      ...invoice,
      tablefood_invoices: invocie_tables
     }
      
  }

  ///nếu time_pay = null lấy ra những invoice chưa thanh toán , status : lấy ra những invoice đã được nhà bếp làm xong
  async get(pagination: any, filter: FilterDto, order: OrderInvoiceDto): Promise<PagedData<Invoice>> {
    let filterInvoice: any = {};
    let orderInvoice: any = [];
    if (filter.id_customer) filterInvoice.id_customer = filter.id_customer;
    if (filter.id_employee) filterInvoice.id_employee = filter.id_employee;
    if (filter.id_promotion) filterInvoice.id_promotion = filter.id_promotion;
    if (filter.status) filterInvoice.status = filter.status;
     if(filter?.thanh_toan === "chua") filterInvoice.time_pay = null; 
    if (filter.time_start && filter.time_end) filterInvoice.createdAt = { [Op.between]: [filter.time_start, filter.time_end] };


    if (order.createdAt) orderInvoice = [...orderInvoice, ["createdAt", `${order.createdAt}`]];
    if (order.order_price) orderInvoice = [...orderInvoice, ["price", `${order.order_price}`]];
    if (order.order_time_pay) orderInvoice = [...orderInvoice, ["time_pay", `${order.order_time_pay}`]];

    const { count, rows } = await this.invoiceRepository.findAndCountAll({
      where: { ...filterInvoice },
      order: [...orderInvoice],
      ...pagination,
      include: [
        {
          model: Employee,
          attributes: { exclude: ["password"] },
        },
        { model: Promotion, 
        
        },
        {
          model: Customer,
      
        },
        {
          model: InvoiceDetail,
          include: [Combo, Product]
         },
        {
          model: TableFoodInvoice,
          // where: filter.id_table
          //   ? {
          //       id_table: filter.id_table,
          //     }
          //   : {},
            // required:false
        },
      ],
    });
    const total = await this.invoiceRepository.count({
      where: { ...filterInvoice },
    });

    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: total,
      CanNext: pageNumber < total,
      CanBack: pageNumber > 1,
      data: rows,
    };
    return data;
  }

  async getById(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findByPk(id, {
      include: [
        {
          model: Employee,
          attributes: { exclude: ["password"] },
        },
        { model: Promotion, 
        },
        {
          model: Customer,
        },
       {
        model: InvoiceDetail,
        include: [Combo, Product]
       },
       {
        model: TableFoodInvoice,
       }
       
      ]
    });
    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    return invoice;
  }

  async create(infoCreate: InvoiceCreate): Promise<Invoice> {
    const invoice = await this.invoiceRepository.create(infoCreate);
    let invoice_details: any = [];
    let table_food_invoices: TblInvoiceCreate[];
    let price: number = 0;
    if (infoCreate.lst_invoice_detail) {
      invoice_details = infoCreate.lst_invoice_detail.map((item) => {
        price = price + item.price;
        return {
          ...item,
          id_invoice: invoice.id,
        };
      });
      await this.invoiceDetaiRepository.bulkCreate(invoice_details);
    }
    //create table_invoice
    if (infoCreate.id_tables) {
      table_food_invoices = infoCreate.id_tables.map((item) => {
        return {
          id_table: item,
          id_invoice: invoice.id,
        };
      });
      await this.tableInvoiceService.createMany(table_food_invoices);
      
      await this.tableFoodRepository.update({status: 1}, {where : {id: infoCreate.id_tables}})
      
    }

    invoice.price = price;
    return await invoice.save();
  }

  async edit(id: number, infoEdit: InoviceEdit): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findByPk(id);

    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    let price: any = {};
    //edit invoice_detail
    if (infoEdit.lst_invoice_detail) {
      price = infoEdit.lst_invoice_detail.reduce((partialSum, item) => partialSum + item.price, 0);
      infoEdit.price = price;
      const id_tables =  await this.invoiceDetaiRepository.destroy({ where: { id_invoice: invoice.id } });
      await this.invoiceDetaiRepository.bulkCreate(infoEdit.lst_invoice_detail);
    }

    //edit invoice_table
    if (infoEdit.id_tables) {
      const table_food_invoices: TblInvoiceEdit[] = infoEdit.id_tables.map((item) => {
        return {
          id_table: item,
          id_invoice: id,
        };
      });
     
      console.log("check ", infoEdit.id_tables)
      await this.tableInvoiceService.editMany(invoice.id, table_food_invoices);
      await this.tableFoodRepository.update({status: 1}, {where : {id: infoEdit.id_tables}})
    }
    const data = await invoice.update(infoEdit)
    return data;
  }
  async deleteById(id: number) {
    await this.invoiceDetaiRepository.destroy({ where: { id_invoice: id } });
    await this.tableInvoiceService.deleteMany(id, null);
    await this.invoiceRepository.destroy({ where: { id: id } });
    return true;
  }

  async splitInvoice(splitInvoice: SplitInvoice) {
    const oldInvoice = await this.invoiceRepository.findByPk(splitInvoice.id_old_order, {
      include: [InvoiceDetail],
    });

    /////////=============CREATE NEW INOVICE =================///////////
    const invocie = await this.invoiceRepository.create({ id_employee: oldInvoice.id_employee });

    let invoice_details: any = [];
    let table_food_invoices: TblInvoiceCreate[] = [];
    let price: number = 0;
    //create new invoice detail
    if (splitInvoice.lst_inovice_detail) {
      invoice_details = splitInvoice.lst_inovice_detail.map((item) => {
        price = price + item.price;
        return {
          ...item,
          id_invoice: invocie.id,
        };
      });
      await this.invoiceDetaiRepository.bulkCreate(invoice_details);
    }

    // create new invoice table
    if (splitInvoice.id_tables) {
      table_food_invoices = splitInvoice.id_tables.map((item) => {
        return {
          id_table: item,
          id_invoice: invocie.id,
        };
      });
      await this.tablefoodInvoiceRepository.bulkCreate(table_food_invoices);
    }

    invocie.price = price;
    await invocie.save();
    ////////////////////////////////////////////////////////////////

    //====================UPDATE INVOICE DETAIL OF OLD INVOICE ===================////
    if (!oldInvoice) throw new NotFoundException({ message: "not found invoice", status: false });
    oldInvoice.invoice_details.forEach(async (item) => {
      if (splitInvoice.lst_inovice_detail) {
        splitInvoice.lst_inovice_detail.forEach(async (item2) => {
          if (item2.id_product === item.id_product || item2.id_combo === item.id_combo) {
            if (item.amount === item2.amount) {
              await this.invoiceDetaiRepository.destroy({ where: { id: item.id } });
            } else {
              const data = {
                ...item2,
                id_invoice: oldInvoice.id,
                amount: item.amount - item2.amount,
                price: item.price - item2.price,
                isCombo: item2.id_combo ? true : false,
              };
              await this.invoiceDetaiRepository.update(data, { where: { id: item.id } });
            }
          }
        });
      }
    });

    // let priceTach = splitInvoice.lst_inovice_detail.reduce((partialSum, item) => partialSum + item.price, 0);
    oldInvoice.price = oldInvoice.price - invocie.price;
    await oldInvoice.save();
    ////////////////////////////////////////////////////////////////
    return invocie;
  }

  async combineInvocie( combineInvocie: CombineInvoice) {
    const old_invoice = await this.invoiceRepository.findByPk(combineInvocie.id_invoice_old, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [InvoiceDetail],
    });
    const new_invoice = await this.invoiceRepository.findByPk(combineInvocie.id_invoice_new, {
      include: [InvoiceDetail],
    });
    if (!old_invoice || !new_invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    const combinedData = new Map();
    function addToMap(array: any) {
      for (const item of array) {
        const key = item.id_product || item.id_combo;
        if (combinedData.has(key)) {
          const existingItem = combinedData.get(key);
          existingItem.amount += item.amount;
          existingItem.price += item.price;
        } else {
          combinedData.set(key, { ...item });
        }
      }
    }
    addToMap(new_invoice.toJSON().invoice_details);
    addToMap(old_invoice.toJSON().invoice_details);
    const combinedArray = Array.from(combinedData.values());
    const dataUpdate = combinedArray.map((item) => {
      return {
        id_invoice: new_invoice.id,
        id_product: item.id_product,
        id_combo: item.id_combo,
        isCombo: item.isCombo,
        price: item.price,
        amount: item.amount,
      };
    });
    if (combineInvocie.isCombineTable) {
      const tablefood_invoice = await this.tablefoodInvoiceRepository.findAll({where: {id_invoice: old_invoice.id}})
       const id_tables = tablefood_invoice.map((item: any) => item.id_table)
      
      await this.tableFoodRepository.update({status: 0}, {where: {id: id_tables}})
      await this.tablefoodInvoiceRepository.destroy({ where: { id_invoice: old_invoice.id } });
  
    } else {
      await this.tablefoodInvoiceRepository.update({ id_invoice: new_invoice.id }, { where: { id_invoice: old_invoice.id } });
    }
    await this.invoiceDetaiRepository.destroy({ where: { id_invoice: old_invoice.id } });
    await old_invoice.destroy();
    await this.invoiceDetaiRepository.destroy({ where: { id_invoice: new_invoice.id } });
    await this.invoiceDetaiRepository.bulkCreate(dataUpdate);
    let price = dataUpdate.reduce((partialSum, item) => partialSum + item.price, 0);
    new_invoice.price = price;
    await new_invoice.save();

    return new_invoice;
  }

  async payment(invoice_id: number, paymentInfo: Payment) {
    const date = new Date();
    const invoice = await this.invoiceRepository.findByPk(invoice_id);

    if (!invoice) throw new NotFoundException({ message: "not found inovice ", status: false });
    // invoice.status = 1;
    invoice.price = paymentInfo.price_current;
    invoice.time_pay = date;
    const table_foods = await this.tablefoodInvoiceRepository.findAll({ where: { id_invoice: invoice_id } });
    const id_table_food = table_foods.map((item) => item.id_table);
    await this.tableFoodRepository.update({ status: 0 }, { where: { id: id_table_food } });
    await invoice.save();
    return invoice;
  }

  async completeInvocie(id_invoice: number) {
    const invoice = await this.invoiceRepository.findByPk(id_invoice);
    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: true });
    const detail_inovices = await this.invoiceDetaiRepository.findAll({
      where: {
        id_invoice: id_invoice,
      },
      include: [
        {
          model: Product,
          include: [UseMaterial],
        },
        {
          model: Combo,
          include: [
            {
              model: DetailCombo,
              include: [
                {
                  model: Product,
                  include: [UseMaterial],
                },
              ],
            },
          ],
        },
      ],
    });

    const use_materials = new Map();
    function addArrayToMap(array: any) {
      for (const item of array) {
        const key = item.id_material;
        if (use_materials.has(key)) {
          const existingItem = use_materials.get(key);
          existingItem.amount = existingItem.amount + item.amount;
        } else {
          use_materials.set(key, {
            id_material: item.id_material,
            amount: item.amount,
          });
        }
      }
    }

    function addSingleToMap(data: any) {
      const key = data.id_material;
      if (use_materials.has(key)) {
        const existingItem = use_materials.get(key);
        existingItem.amount = existingItem.amount + data.amount;
      } else {
        use_materials.set(key, {
          id_material: data.id_material,
          amount: data.amount,
        });
      }
    }

    detail_inovices.map((detail_invocie) => {
      if (detail_invocie.product) {
        const array = detail_invocie.product.use_materials.map((item) => {
          return {
            id_material: item.id_material,
            amount: item.amount * detail_invocie.amount,
          };
        });
        addArrayToMap(array);
      }
      if (detail_invocie.combo) {
        detail_invocie.combo.detail_combos.forEach((detail_combo: any) => {
          if (detail_combo.product) {
            detail_combo.product.use_materials.forEach((item: any) => {
              addSingleToMap({
                id_material: item.id_material,
                amount: item.amount * detail_invocie.amount,
              });
            });
          }
        });
      }
    });
    const update_materials: any[] = Array.from(use_materials.values());
    update_materials.forEach(async (item: any) => {
      const material = await this.materialRepository.findByPk(item.id_material);
      if (!material) throw new NotFoundException({ message: "not found material", status: false });
      await material.update({ amount: material.amount - item.amount });
    });
    await invoice.update({ status: 1 });
    return true;
  }

  async getOrverView(time: string) {
    try {
      let startTime: any;
      let endTime: any;
      let filter: any = {}
      const currentDate = new Date();
      if(time === "today") {
         endTime = endOfDay(currentDate)
         startTime = startOfDay(currentDate)
      }
      if(time === "thisweek") {
        endTime = endOfWeek(currentDate)
        startTime = startOfWeek(currentDate)
     }
     if(time === "thismonth") {
      endTime = endOfMonth(currentDate)
      startTime = startOfMonth(currentDate)
      }
      if(time === "thisyear") {
        endTime = endOfYear(currentDate)
        startTime = startOfYear(currentDate)
    }
      if(startTime && endTime) {
          filter.createdAt = {[Op.between] : [startTime, endTime]}
      }
      let resp = await this.invoiceRepository.findOne({
        attributes: [
          [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("price"), 'float')), "productMoney"], 
          [Sequelize.fn("COUNT", Sequelize.col("invoice.id")), "soHoaDon"]
        ],
        raw: true,
        where:{
          ...filter
        }
      });
      let test: any = resp;
      const coutInvoiceDetail = await this.invoiceDetaiRepository.count({
        where:{
          ...filter
        }
      })
       const countCustomer = await this.customerRepository.count({
          where:{
            ...filter
          }
       })
      const totalShipment = await this.shipmentRepository.sum("price", {
        where:{
          ...filter
        }
      })
      const topProduct = await this.invoiceDetaiRepository.findAll({
        where:{
          ...filter
        },
        include: [Product, Combo],
        attributes: [
          [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'integer')), "totalPrice"], 
          [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("amount"), 'integer')), "totalAmout"],
          [Sequelize.col("Product.name"), "nameProduct"] ,
          [Sequelize.col("Combo.name"), "nameCombo"] 
        ],
        group: ["id_product", "id_combo"],
        order: [["totalPrice", "DESC"]],
        limit:5
       
       })

       const dataSend = {
        totalShipment: totalShipment,
        coutInvoiceDetail: coutInvoiceDetail,
        topProduct: topProduct,
        countCustomer: countCustomer,
        doanhthu: test.productMoney ? test?.productMoney - totalShipment : 0 ,
        ...resp
       }   
       return dataSend
    } catch (err: any) {
      console.log("check ", err)
    }
  }

  async getRevenueOverview() {
     const dataSend = []
     const currentDate  = new Date()
     for(let month = 0; month < 12; month ++){
      const firstDayOfMonthCurentYear = new Date(currentDate.getFullYear(), month, 1);
      const lastDayOfMonthCurentYear = new Date(currentDate.getFullYear(), month + 1, 0);
      const firstDayOfMonthPreYear = new Date(currentDate.getFullYear() - 1 , month, 1);
      const lastDayOfMonthPreYear = new Date(currentDate.getFullYear() -1 , month + 1, 0);
       const uv = await this.invoiceRepository.sum("price", {
        where : {
          createdAt: {[Op.between] : [firstDayOfMonthCurentYear, lastDayOfMonthCurentYear]}
        }
       })
       const pv = await this.invoiceRepository.sum("price", {
        where : {
          createdAt: {[Op.between] : [firstDayOfMonthPreYear, lastDayOfMonthPreYear]}
        }
       })
      dataSend.push({
          name :`Tháng ${month + 1}`,
          uv: uv ? uv : 0,
          pv: pv ? pv : 0
      });
     }
     return dataSend
  }
}
