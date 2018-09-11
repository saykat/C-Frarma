import { Component } from '@angular/core';
import {MedicineModel} from "../../../models/medicine.model";
import {MedicineService} from "../../../services/medicine.service";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {CompanyService} from "../../../services/company.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {CompanyModel} from "../../../models/company.model";
import {CartService} from "../../../services/cart.service";
import {SalesItemModel} from "../../../models/SalesItem.model";
import {SalesService} from "../../../services/sales.service";
import {NotificationsService} from 'angular2-notifications';

@Component({
  templateUrl: 'new-sales.component.html'
})
export class NewSalesComponent {

  medicineList: MedicineModel[] = []
  searchKey: string;
  groupKey: string;
  companyKey: string;
  groupName: string;
  companyName: string;

  medicineGroupList: MedicineGroupModel[] = [];
  companyList: CompanyModel[] = [];


  constructor(private medicineService: MedicineService,
              private medicineGroupService: MedicineGroupService,
              private companyService: CompanyService,
              private cartService: CartService,
              private salesService: SalesService,
              private notificationService: NotificationsService
  ) {}


  ngOnInit() {
   this.getMedicine();
  }
  ngDoCheck(){
    let newTotal = 0;
    let newDiscount = 0;
    this.cartService.salesItem.forEach((item)=>{
      newTotal = newTotal + (item.sellingPrice * item.qty);
      newDiscount = newDiscount + (item.discount * item.qty);
    })

    this.cartService.total = newTotal;
    this.cartService.totalDiscount = newDiscount;
  }

  getMedicine(){
    this.medicineService.viewMedicines(this.searchKey, this.groupKey, this.companyKey).subscribe((res)=> {
      this.medicineList = res.data;
    })
  }

  onSelectionChangedMedicine(value){
    console.log(value)
    this.medicineList.forEach((medicine)=>{
      if(medicine.name == value){
        let salesItem: any = medicine;
        salesItem.qty = 10;
        salesItem.discount = 0;
        salesItem.discountPer = 0;
        salesItem.subtotal = salesItem.qty * salesItem.sellingPrice;

        let avoid = false;
        this.cartService.salesItem.forEach((item)=>{
          if(item._id == medicine._id){
            avoid = true;
          }
        })
        if(avoid == false){
          this.cartService.salesItem.push(salesItem);
        }
        // this.searchKey = '';
      }
    });
    setTimeout(()=>{
      this.searchKey = '';
    },500);
  }

  getMedicineGroups(){
    this.medicineGroupService.viewMedicineGroup(this.groupName).subscribe((res)=>{
      this.medicineGroupList = res.data;
    });
  }

  getCompany(){
    this.companyService.viewCompany(this.companyName).subscribe((res)=>{
      this.companyList = res.data;
    });
  }




  onSelectionChangedMedicineGroup(groupName){

    if(this.medicineGroupList.length > 0){
      this.medicineGroupList.forEach(medicineGroup => {
        if(medicineGroup.name == groupName)
          this.groupKey = medicineGroup._id;
      })
    }

  }


  onSelectionChangedCompany(companyName){

    if(this.companyList.length > 0){
      this.companyList.forEach(company => {
        if(company.name == companyName)
          this.companyKey = company._id;
      })
    }

  }

  newSale(){
    let outstandingAmount = (this.cartService.total - this.cartService.totalDiscount) - this.cartService.paidAmount;

    if(outstandingAmount <= 0){
      this.salesService.newSale().subscribe((res) => {
        this.cartService = new CartService();
        this.notificationService.success('Success', res.msg)
      })
    }else{
      this.notificationService.warn('Warn', 'Outstanding Balance Should Be Paid')
    }

  }

  updateQty( currentItemId, newQty){
    this.cartService.salesItem.forEach((item)=>{
      if(item._id == currentItemId){
        item.qty = newQty;
      }
    })
  }

  updatePrice( currentItemId, newPrice){
    this.cartService.salesItem.forEach((item)=>{
      if(item._id == currentItemId){

        if(newPrice >= item.costPrice){
          let currentDiscount = item.sellingPrice - newPrice;

          item.sellingPrice = parseInt(newPrice);

          let totalDiscount = currentDiscount + item.discount;
          let maxPrice = totalDiscount +  item.sellingPrice;
          let currentPerDiscount = (totalDiscount * 100) / maxPrice;
          item.discountPer = currentPerDiscount;
          item.discount = totalDiscount;

        }
        // else{
        //   currentDiscount = item.sellingPrice - item.costPrice;
        //   item.sellingPrice = newPrice;
        // }

      }
    })
  }

  updatePriceOnFocusout( currentItemId, newPrice){
    this.cartService.salesItem.forEach((item)=>{
      if(item._id == currentItemId){

        if(newPrice < item.costPrice){
          let currentDiscount = item.sellingPrice - item.costPrice;

          item.sellingPrice = item.costPrice;

          let totalDiscount = currentDiscount + item.discount;
          let maxPrice = totalDiscount +  item.sellingPrice;
          let currentPerDiscount = (totalDiscount * 100) / maxPrice;
          item.discountPer = currentPerDiscount;
          item.discount = totalDiscount;

        }

      }
    })
  }


  updateDiscount( currentItemId, newPerDiscount ){
    this.cartService.salesItem.forEach((item)=>{
      if(item._id == currentItemId){

        if(newPerDiscount > 0){
          let maxPrice = item.discount + item.sellingPrice;
          let calculatedDiscount = (newPerDiscount / 100) * maxPrice;
          let newPrice = maxPrice - calculatedDiscount;
          if(newPrice >= item.costPrice){
            item.sellingPrice = newPrice;
            item.discount = calculatedDiscount;
            item.discountPer = newPerDiscount;
          }
        }

      }
    })
  }


  updateDiscountOnFocusout( currentItemId, newPerDiscount ){
    this.cartService.salesItem.forEach((item)=>{
      if(item._id == currentItemId){

        if( newPerDiscount <= 0 ){
          let maxPrice = item.discount + item.sellingPrice;
          item.sellingPrice = maxPrice;
          item.discount = 0;
          item.discountPer = 0;
        }

      }
    })
  }

  removeItem(currentItemId){
    let index = 0;
    this.cartService.salesItem.forEach((item)=>{
      if(item._id == currentItemId){
        this.cartService.salesItem.splice(index, 1);
      }
      index++;
    })
  }






}
