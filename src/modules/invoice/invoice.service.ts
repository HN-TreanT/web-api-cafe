import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  CUSTOMER_REPOSITORY,
  INVOICE_DETAIL_REPOSITORY,
  INVOICE_REPOSITORY,
  MATERIAL_REPOSITORY,
  PRODUCT_REPOSITORY,
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
import { UseMaterial } from "../use_material/use_material.entity";
import { DetailCombo } from "../detail_combo/detail_combo.entity";
import { Material } from "../material/material.entity";
import { Shipment } from "../shipment/shipment.entity";
import {startOfDay, endOfDay, startOfWeek, endOfWeek , startOfMonth, endOfMonth, startOfYear, endOfYear} from "date-fns"
import {join} from 'path'
import {readFile, readFileSync, writeFileSync} from 'fs'
import { Cell,Row } from "exceljs";
import ExcelJS from "exceljs"
import { VND } from "src/helpers/convertVND";
import moment from "moment";
import XlsxTemplate from "xlsx-template"
const XLSXChart: any = require("xlsx-chart")
const xlsxChart = new XLSXChart()
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
    @Inject(PRODUCT_REPOSITORY) private readonly productRepositorty: typeof Product,

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
        
       },    
      ]
     })
     

     const invocie_tables = await this.tablefoodInvoiceRepository.findAll(
      {
     
        where: {
      id_invoice: invoice.dataValues.id
     }})

     if(!invoice) throw new NotFoundException({ message: "Không tìm thấy yêu cầu hợp lệ", status: false });

    //  console.log(invoice.dataValues)

     return {
      ...invoice.dataValues,
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
    // if (filter.status) filterInvoice.status = filter.status;
    if (filter.status) filterInvoice.status = {[Op.in] : [...filter?.status]};
     if(filter?.thanh_toan) filterInvoice.time_pay = filter.thanh_toan === "chua" ? null : {[Op.ne] : null};  // chua va thanhtoan
    if (filter.time_start && filter.time_end) {
                    
      filterInvoice.createdAt = { [Op.between]: [filter.time_start, filter.time_end] }
    
    };


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
    // const table_foods = await this.tablefoodInvoiceRepository.findAll({ where: { id_invoice: invoice_id } });
    // const id_table_food = table_foods.map((item) => item.id_table);
    // await this.tableFoodRepository.update({ status: 0 }, { where: { id: id_table_food } });
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
    // try {
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
          [Sequelize.fn("COUNT", Sequelize.col("Invoice.id")), "soHoaDon"]
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
      // const topProduct = await this.invoiceDetaiRepository.findAll({
      //   where:{
      //     ...filter
      //   },
      //   include: [Product, Combo],
      //   attributes: [
      //     [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'integer')), "totalPrice"], 
      //     [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("amount"), 'integer')), "totalAmout"],
      //     [Sequelize.col("Product.name"), "nameProduct"] ,
      //     [Sequelize.col("Combo.name"), "nameCombo"] 
      //   ],
      //   group: ["id_product", "id_combo"],
      //   order: [["totalPrice", "DESC"]],
      //   limit:5
       
      //  })
      const topProduct = await this.invoiceDetaiRepository.findAll({
        where:{
          ...filter
        },
        include: [
          {
            model: Product,
            attributes: ['name'],
          },
          {
            model: Combo,
            attributes: ['name'],
          },
            ],
        attributes: [
          [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'integer')), "totalPrice"], 
          [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("amount"), 'integer')), "totalAmout"],
          // [Sequelize.col("Product.name"), "nameProduct"] ,
          // [Sequelize.col("Combo.name"), "nameCombo"] 
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
        doanhthu: test.productMoney ? test?.productMoney : 0 ,
        ...resp
       }   
       return dataSend
    // } catch (err: any) {
    //   console.log("check ", err)
    // }
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

 

   stylCellHeader(cell: Cell) {
     cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
     cell.font = {size: 14, family: 1, bold:true, color: { argb: 'ffffff' }};
     cell.fill =  {
      type: 'pattern',
      pattern:'solid',
      fgColor: { argb: 'B18904' }
     },
     cell.border= {
      top: { style: 'medium',  color: { argb: 'cccccc' }  },
      left: { style: 'medium',  color: { argb: 'cccccc' }  },
      bottom: { style: 'medium',  color: { argb: 'cccccc' }  },
      right: { style: 'medium', color: { argb: 'cccccc' }  },
      
     }
     
   }

   styleCellNameProduct(cell: Cell) {
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.font = {size: 14, family: 1, bold:true, color: { argb: 'ffffff' }};
    cell.fill =  {
      type: 'pattern',
      pattern:'solid',
      fgColor:{ argb:'886A08' }
     },
     cell.border= {
      top: { style: 'medium',  color: { argb: 'cccccc' }  },
      left: { style: 'medium',  color: { argb: 'cccccc' }  },
      bottom: { style: 'medium',  color: { argb: 'cccccc' }  },
      right: { style: 'medium', color: { argb: 'cccccc' }  },
      
     }
   }

   styleUocATinhThucTe(cell:Cell) {
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.font = {size: 12, family: 1, bold:true, color: { argb: 'ffffff' }};
      cell.fill =  {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'A4A4A4' }
      },
      cell.border= {
        top: { style: 'medium',  color: { argb: 'cccccc' }  },
        left: { style: 'medium',  color: { argb: 'cccccc' }  },
        bottom: { style: 'medium',  color: { argb: 'cccccc' }  },
        right: { style: 'medium', color: { argb: 'cccccc' }  },
        
      }
   }

   styleListSidebarYear (cell: Cell) {
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.font = {size: 10, family: 1, bold:true};
    cell.fill =  {
      type: 'pattern',
      pattern:'solid',
      fgColor:{ argb:'D8D8D8' }
    },
    cell.border= {
      top: { style: 'medium',  color: { argb: 'cccccc' },   },
      left: { style: 'medium',  color: { argb: 'cccccc' }  },
      bottom: { style: 'medium',  color: { argb: 'cccccc' }  },
      right: { style: 'medium', color: { argb: 'cccccc' }  },
      
    }
   }

   styleValue (cell: Cell) {
    cell.alignment = {  wrapText: true, vertical: 'middle', horizontal: 'right', };
    cell.font = {size: 10, family: 1};
    cell.fill =  {
      type: 'pattern',
      pattern:'solid',
      fgColor:{ argb:'ffffff' }
    },
    cell.border= {
      top: { style: 'medium',  color: { argb: 'cccccc' }  },
      left: { style: 'medium',  color: { argb: 'cccccc' }  },
      bottom: { style: 'medium',  color: { argb: 'cccccc' }  },
      right: { style: 'medium', color: { argb: 'cccccc' }  },
      
    }
   }

   async AddToMap(array: any[], time: string, combinedData: any) {
      //  let index = 1 ;
      for (const item of array) {
        
        // console.log(index)
        // index = index + 1
        const key = item.id_product ? `product_${item.id_product}` : `combo_${item.id_combo}` ;
        if (combinedData.has(key)) {

          const existingItem = combinedData.get(key);
          existingItem[`${time}`] = {thucte: item?.dataValues?.totalPrice || 0,uoctinh:item?.product ? item?.product?.price * item.amount : item?.combo?.price * item.amount}
          existingItem.total = {
            thucte: existingItem.total.thucte +  existingItem[`${time}`].thucte,
            uoctinh: existingItem.total.uoctinh +  existingItem[`${time}`].uoctinh,
          }
        } else {
          // tensanpham:"San pham 1",
          // current_q1: {uoctinh: 10, thucte:20},
          // current_q2: {uoctinh: 43, thucte:98},
          // current_q3: {uoctinh: 12, thucte:124},
          // current_q4: {uoctinh: 16, thucte:33},
          // pre_q1: {uoctinh: 16, thucte:33},
          // pre_q2: {uoctinh: 16, thucte:33},
          // pre_q3: {uoctinh: 16, thucte:33},
          // pre_q4: {uoctinh: 16, thucte:33},
          // total: {uoctinh: 101, thucte: 102}
          const data = {
            tensanpham: item?.product ? item?.product?.name : item?.combo?.name,
            current_q1: {uoctinh:0, thucte:0},
            current_q2: {uoctinh:0, thucte:0},
            current_q3: {uoctinh:0, thucte:0},
            current_q4: {uoctinh:0, thucte:0},
            pre_q1: {uoctinh:0, thucte:0},
            pre_q2: {uoctinh:0, thucte:0},
            pre_q3: {uoctinh:0, thucte:0},
            pre_q4: {uoctinh:0, thucte:0},
            total: {uoctinh: 0, thucte: 0}

          }
          data[`${time}`] = {thucte: item?.dataValues?.totalPrice || 0,uoctinh:item?.product ? item?.product?.price * item?.amount : item?.combo?.price * item?.amount}
          data.total = {
            thucte: data.total.thucte +  data[`${time}`].thucte,
            uoctinh: data.total.uoctinh +  data[`${time}`].uoctinh,
          }
          combinedData.set(key, data);
        }
      }
  }

   async getDataReport(curretYear: any) {
    const combinedData = new Map()
      ////******** GET CURRENT YEAR ****************///////

      const listDataQ1 = await this.invoiceDetaiRepository.findAll({
       
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-1-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-3-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
      include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
      attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
      group: ["id_product", "id_combo"], 
      })

      const listDataQ2 = await this.invoiceDetaiRepository.findAll({
        
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-4-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-6-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
      include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
      attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
      group: ["id_product", "id_combo"], 
      })

      const listDataQ3 = await this.invoiceDetaiRepository.findAll({
      
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-7-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-9-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
      include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
      attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
      group: ["id_product", "id_combo"], 
      })

      const listDataQ4 = await this.invoiceDetaiRepository.findAll({
       
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-10-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-12-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
      include: [{model:Product,as:"product"}, {model: Combo, as:"combo"}], 
      attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
      group: ["id_product", "id_combo"], 
      })


     

      

      /////////////////////////////////////////////////

      ////******** GET PRE YEAR ****************///////
      const listDataQ1Pre = await this.invoiceDetaiRepository.findAll({
        
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-1-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-3-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
        include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
        attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
        group: ["id_product", "id_combo"], 
      })

      const listDataQ2Pre = await this.invoiceDetaiRepository.findAll({
        
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-4-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-6-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
      include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
      attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
      group: ["id_product", "id_combo"], 
      })

      const listDataQ3Pre = await this.invoiceDetaiRepository.findAll({
        
        where:{[Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
        createdAt: {
          [Op.gte]:  moment(`${curretYear}-7-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          [Op.lt]: moment(`${curretYear}-9-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
        
        },
      },
        include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
        attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
        group: ["id_product", "id_combo"], 
      })

      const listDataQ4Pre = await this.invoiceDetaiRepository.findAll({
        where:{
          [Op.or] : [{id_product: {[Op.not]: null}}, {id_combo: {[Op.not]: null}}], 
          createdAt: {
            [Op.gte]: moment(`${curretYear - 1}-10-1 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
            [Op.lt]: moment(`${curretYear - 1}-12-31 00:00:00`, "YYYY-MM-DD HH:mm:ss").toISOString(),
          },
        },       
         include: [{model:Product, as:"product"}, {model: Combo, as:"combo"}], 
         attributes:[[Sequelize.col("product.id"), "id_product"],[Sequelize.col("combo.id"), "id_combo"],[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.price"), 'float')), "totalPrice"], [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("InvoiceDetail.amount"), 'float')), "amount"],],
         group: ["id_product", "id_combo"], 
  
          
      })



      await this.AddToMap(listDataQ1,"current_q1",combinedData)
      await this.AddToMap(listDataQ2,"current_q2",combinedData)
      await this.AddToMap(listDataQ3,"current_q3",combinedData)
      await this.AddToMap(listDataQ4,"current_q4",combinedData)
      await this.AddToMap(listDataQ1Pre,"pre_q1",combinedData)
      await this.AddToMap(listDataQ2Pre,"pre_q2",combinedData)
      await this.AddToMap(listDataQ3Pre,"pre_q3",combinedData)
      await this.AddToMap(listDataQ4Pre,"pre_q4",combinedData)
      


       const dataRes = Array.from(combinedData.values())
       
      ////////////////////////////////////////////////////////
      return dataRes
      //  return listDataQ1
   }


   async insertChartWithXlSXTemplate(data: any[], workbook: any, fileRead: any) : Promise<any>{
     try {
      const nowDate = new Date()
      const currentYear = nowDate.getFullYear()
      const dataReport =await this.getDataReport(currentYear)
      dataReport.sort((a, b) => {

        return b.total.thucte - a.total.thucte
      })
   
      const dataSubmit: any[] = []
      dataReport.map((item :any,index: number) => {
         if(index <10) {
             dataSubmit.push(  {
              tensanpham: item?.tensanpham || "",
              q1: item?.current_q1 ?  item?.current_q1.thucte  : 0,
              q2: item?.current_q2 ?  item?.current_q2.thucte  : 0,
              q3: item?.current_q3 ?  item?.current_q3.thucte  : 0,
              q4: item?.current_q4 ?  item?.current_q4.thucte  : 0,
              q5: item?.pre_q1 ?  item?.pre_q1.thucte  : 0,
              q6: item?.pre_q2 ?  item?.pre_q2.thucte  : 0,
              q7: item?.pre_q3 ?  item?.pre_q3.thucte  : 0,
              q8: item?.pre_q4 ?  item?.pre_q4.thucte  : 0,
              total: item?.total ? item?.total.thucte : 0
    
            })
         }
       })
    
        var template = new XlsxTemplate(fileRead)
        var values = {
          // sanpham: [
          //   {tensanpham:"Sản phẩm 1", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43},
          //   {tensanpham:"Sản phẩm 2", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 3", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 4", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 5", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 6", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 7", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 8", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},
          //   {tensanpham:"Sản phẩm 9", q1: 2,q2: 23,q3: 65,q4: 56,q5: 23,q6: 86,q7: 65,q8: 43,},

          // ]
          sanpham: dataSubmit

        }
        template.substitute(1, values)
        var arrayBuffur = template.generate({type: "arraybuffer"});
        var excelBufferData = Buffer.from(arrayBuffur);
        return excelBufferData
     }  catch (err: any) {    
        console.log(err)
        throw new BadRequestException(err.message);
     }
       
   }

    async exportFileReport(res:any) : Promise<any> {
      const path = join(__dirname,'..','..','src/templates/excel/ExampleBaoCao.xlsx')   
      const workbook = new ExcelJS.Workbook();
      
      const templatefile = readFileSync(path) 
      //  const examplaeFile = await this.insertChartWithXlSXTemplate([],workbook, templatefile )
      // //  if(!examplaeFile) return;
      
      const nowDate = new Date()
      const currentYear = nowDate.getFullYear()
      const dataReport =await this.getDataReport(currentYear)

     await workbook.xlsx.load(templatefile) 
      
      const worksheet = workbook.getWorksheet(1)
      worksheet.state = "visible"
      const years = [`${currentYear} Q1`, `${currentYear} Q2`, `${currentYear} Q3`, `${currentYear} Q4`, 
                         `${currentYear - 1} Q1`, `${currentYear - 1} Q2`, `${currentYear - 1} Q3`, `${currentYear - 1} Q4`, `Tổng`]
       

      ///tieu de
      const rowHeader = worksheet.getRow(5)
      const cellHeader = rowHeader.getCell(3)
      cellHeader.value = "SẢN PHẨM"
      worksheet.mergeCells(
        Number(cellHeader.row),
        Number(cellHeader.col),
        Number(cellHeader.row),
        Number(cellHeader.col + dataReport.length*2) - 1 ,
        // "BaoCaoDoanhThu"
      )
      this.stylCellHeader(cellHeader)
      ////////
      let startColYear = 8

      ///*******  SIDEBAR */
      years.forEach((item1) => {
        const rowYear = worksheet.getRow(startColYear)
        const colYear = rowYear.getCell(2)
        colYear.value = item1
        this.styleListSidebarYear(colYear)
        startColYear  = startColYear + 1
      })


      ////***FOOTER */
      const position = Number(cellHeader.col + dataReport.length*2) - 1
      const rowFooter = worksheet.getRow(17)
      const colStartFooterTitleUocTinh  = rowFooter.getCell(position - 7) 
      const colStartFooterValueUocTinh = rowFooter.getCell(position-5)

      const colStartFooterTitleThucTe = rowFooter.getCell(position - 3)
      const colStartFooterValueThucTe = rowFooter.getCell(position - 1)
      worksheet.mergeCells(
        Number(colStartFooterTitleUocTinh.row),
        Number(colStartFooterTitleUocTinh.col),
        Number(colStartFooterTitleUocTinh.row + 1),
        Number(colStartFooterTitleUocTinh.col + 1),
      )
      worksheet.mergeCells(
        Number(colStartFooterValueUocTinh.row),
        Number(colStartFooterValueUocTinh.col),
        Number(colStartFooterValueUocTinh.row + 1),
        Number(colStartFooterValueUocTinh.col + 1),
      )
      worksheet.mergeCells(
        Number(colStartFooterTitleThucTe.row),
        Number(colStartFooterTitleThucTe.col),
        Number(colStartFooterTitleThucTe.row + 1),
        Number(colStartFooterTitleThucTe.col + 1),
      )
      worksheet.mergeCells(
        Number(colStartFooterValueThucTe.row),
        Number(colStartFooterValueThucTe.col),
        Number(colStartFooterValueThucTe.row + 1),
        Number(colStartFooterValueThucTe.col + 1),
      )

      colStartFooterTitleUocTinh.value = "TỔNG ƯỚC TÍNH"
      colStartFooterTitleThucTe.value = "TỔNG THỰC TẾ"
      this.stylCellHeader(colStartFooterTitleThucTe)
      this.stylCellHeader(colStartFooterTitleUocTinh)
      let priceThucte = 0
      let priceUocTinh = 0
      dataReport.forEach((item: any) => {
         priceThucte = priceThucte + item?.total?.thucte
         priceUocTinh = priceUocTinh + item?.total?.uoctinh
      })

    
      // const priceUocTinh/// 

      colStartFooterValueThucTe.value = VND.format(priceThucte)
      colStartFooterValueUocTinh.value = VND.format(priceUocTinh)

      this.styleValue(colStartFooterValueThucTe)
      this.styleValue(colStartFooterValueUocTinh)
      colStartFooterValueThucTe.fill = {type: 'pattern',pattern:'solid',fgColor:{ argb:'F6E3CE' }}
      colStartFooterValueThucTe.font = {size: 10, family: 1, bold: true}
      colStartFooterValueThucTe.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

      colStartFooterValueUocTinh.fill = {type: 'pattern',pattern:'solid',fgColor:{ argb:'F6E3CE' }}
      colStartFooterValueUocTinh.font = {size: 10, family: 1, bold: true}
      colStartFooterValueUocTinh.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  

      ////***FOOTER */


      /////************** */
      let startCol = 3
      dataReport.forEach((item: any) => {
             worksheet.getColumn(startCol).width = 15
            worksheet.getColumn(startCol + 1).width = 15 
            //****TEN SAN PHAM */
            const rowNameProduct = worksheet.getRow(6)
            const colNameProduct = rowNameProduct.getCell(startCol)
            worksheet.mergeCells(
              Number(colNameProduct.row),
              Number(colNameProduct.col),
              Number(colNameProduct.row),
              Number(colNameProduct.col) + 1 ,
              // "BaoCaoDoanhThu"
            )
            colNameProduct.value = item.tensanpham
            this.styleCellNameProduct(colNameProduct)
            //****TEN SAN PHAM */

            //****UOC TINH, THUIC TE */
            const rowUocTinh = worksheet.getRow(7)
            const colUocTinh = rowUocTinh.getCell(startCol)
            const colThucTe = rowUocTinh.getCell(startCol + 1)
            colUocTinh.value = "ƯỚC TÍNH"
            colThucTe.value = "THỰC TẾ"
            this.styleUocATinhThucTe(colUocTinh)
            this.styleUocATinhThucTe(colThucTe)
            //****UOC TINH, THUIC TE */

            //****VALUE */
              for(let i = 8 ; i<=11 ; i++) {
                const rowValue1 = worksheet.getRow(i)
                const colValueUocTinh1 = rowValue1.getCell(startCol)
                const colValueThucTe1 = rowValue1.getCell(startCol + 1)
                colValueUocTinh1.value =  VND.format(item[`current_q${i - 7}`].uoctinh)
                colValueThucTe1.value =  VND.format(item[`current_q${i - 7}`].thucte)
                this.styleValue(colValueUocTinh1)
                this.styleValue(colValueThucTe1)
                colValueThucTe1.fill ={
                  type: 'pattern',
                  pattern:'solid',
                  fgColor:{ argb:'F6E3CE' }
                };
              }

              for(let i = 12 ; i<=15 ; i++) {
                const rowValue1 = worksheet.getRow(i)
                const colValueUocTinh1 = rowValue1.getCell(startCol)
                const colValueThucTe1 = rowValue1.getCell(startCol + 1)
                colValueUocTinh1.value =  VND.format(item[`pre_q${i - 11}`].uoctinh)
                colValueThucTe1.value =  VND.format(item[`pre_q${i - 11}`].thucte)
                this.styleValue(colValueUocTinh1)
                this.styleValue(colValueThucTe1)
                colValueThucTe1.fill ={
                  type: 'pattern',
                  pattern:'solid',
                  fgColor:{ argb:'F6E3CE' }
                };
              }

              const rowValueTotal = worksheet.getRow(16)
              const colValueUocTinhTotal= rowValueTotal.getCell(startCol)
              const colValueThucTeTotal = rowValueTotal.getCell(startCol + 1)
              colValueUocTinhTotal.value =  VND.format(item.total.uoctinh)
              colValueThucTeTotal.value =  VND.format(item.total.thucte)
              this.styleValue(colValueUocTinhTotal)
              this.styleValue(colValueThucTeTotal)
              colValueUocTinhTotal.font = {size: 10, family: 1, bold: true}
              colValueThucTeTotal.font = {size: 10, family: 1, bold: true}
              colValueThucTeTotal.fill ={
                type: 'pattern',
                pattern:'solid',
                fgColor:{ argb:'F6E3CE' }
              };
            
              // const rowValue1 = worksheet.getRow(8)
              // const colValueUocTinh1 = rowValue1.getCell(startCol)
              // const colValueThucTe1 = rowValue1.getCell(startCol + 1)
              // colValueUocTinh1.value =  VND.format(item.current_q1.uoctinh)
              // colValueThucTe1.value =  VND.format(item.current_q1.thucte)
              // this.styleValue(colValueUocTinh1)
              // this.styleValue(colValueThucTe1)
              // colValueThucTe1.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue2 = worksheet.getRow(9)
              // const colValueUocTinh2 = rowValue2.getCell(startCol)
              // const colValueThucTe2 = rowValue2.getCell(startCol + 1)
              // colValueUocTinh2.value =  VND.format(item.current_q2.uoctinh)
              // colValueThucTe2.value =  VND.format(item.current_q2.thucte)
              // this.styleValue(colValueUocTinh2)
              // this.styleValue(colValueThucTe2)
              // colValueThucTe2.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue3 = worksheet.getRow(10)
              // const colValueUocTinh3 = rowValue3.getCell(startCol)
              // const colValueThucTe3 = rowValue3.getCell(startCol + 1)
              // colValueUocTinh3.value =  VND.format(item.current_q3.uoctinh)
              // colValueThucTe3.value =  VND.format(item.current_q3.thucte)
              // this.styleValue(colValueUocTinh3)
              // this.styleValue(colValueThucTe3)
              // colValueThucTe3.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue4 = worksheet.getRow(11)
              // const colValueUocTinh4 = rowValue4.getCell(startCol)
              // const colValueThucTe4 = rowValue4.getCell(startCol + 1)
              // colValueUocTinh4.value =  VND.format(item.current_q4.uoctinh)
              // colValueThucTe4.value =  VND.format(item.current_q4.thucte)
              // this.styleValue(colValueUocTinh4)
              // this.styleValue(colValueThucTe4)
              // colValueThucTe4.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue1Pre = worksheet.getRow(12)
              // const colValueUocTinh1Pre = rowValue1Pre.getCell(startCol)
              // const colValueThucTe1Pre = rowValue1Pre.getCell(startCol + 1)
              // colValueUocTinh1Pre.value =   VND.format(item.pre_q1.uoctinh)
              // colValueThucTe1Pre.value =  VND.format(item.pre_q1.thucte)
              // this.styleValue(colValueUocTinh1Pre)
              // this.styleValue(colValueThucTe1Pre)
              // colValueThucTe1Pre.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue2Pre = worksheet.getRow(13)
              // const colValueUocTinh2Pre = rowValue2Pre.getCell(startCol)
              // const colValueThucTe2Pre = rowValue2Pre.getCell(startCol + 1)
              // colValueUocTinh2Pre.value =  VND.format(item.pre_q2.uoctinh)
              // colValueThucTe2Pre.value =  VND.format(item.pre_q2.thucte)
              // this.styleValue(colValueUocTinh2Pre)
              // this.styleValue(colValueThucTe2Pre)
              // colValueThucTe2Pre.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue3Pre = worksheet.getRow(14)
              // const colValueUocTinh3Pre = rowValue3Pre.getCell(startCol)
              // const colValueThucTe3Pre = rowValue3Pre.getCell(startCol + 1)
              // colValueUocTinh3Pre.value =  VND.format(item.pre_q3.uoctinh)
              // colValueThucTe3Pre.value =  VND.format(item.pre_q3.thucte)
              // this.styleValue(colValueUocTinh3Pre)
              // this.styleValue(colValueThucTe3Pre)
              // colValueThucTe3Pre.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValue4Pre = worksheet.getRow(15)
              // const colValueUocTinh4Pre = rowValue4Pre.getCell(startCol)
              // const colValueThucTe4Pre = rowValue4Pre.getCell(startCol + 1)
              // colValueUocTinh4Pre.value =  VND.format(item.pre_q4.uoctinh)
              // colValueThucTe4Pre.value =  VND.format(item.pre_q4.thucte)
              // this.styleValue(colValueUocTinh4Pre)
              // this.styleValue(colValueThucTe4Pre)
              // colValueThucTe4Pre.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };

              // const rowValueTotal = worksheet.getRow(16)
              // const colValueUocTinhTotal= rowValueTotal.getCell(startCol)
              // const colValueThucTeTotal = rowValueTotal.getCell(startCol + 1)
              // colValueUocTinhTotal.value =  VND.format(item.total.uoctinh)
              // colValueThucTeTotal.value =  VND.format(item.total.thucte)
              // this.styleValue(colValueUocTinhTotal)
              // this.styleValue(colValueThucTeTotal)
              // colValueThucTeTotal.fill ={
              //   type: 'pattern',
              //   pattern:'solid',
              //   fgColor:{ argb:'F6E3CE' }
              // };


           startCol = startCol + 2
      })
      

      /// gui file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${`BaoCaoDoanhThu1.xlsx`}`);
      await workbook.xlsx.write(res)
      res.send()
      // res.end(workbook)
      return path
  }


}
