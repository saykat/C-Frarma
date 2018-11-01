import { Component } from '@angular/core';
import {MedicineModel} from "../../../models/medicine.model";
import {MedicineService} from "../../../services/medicine.service";
import {MedicineGroupService} from "../../../services/medicine-group.service";
import {CompanyService} from "../../../services/company.service";
import {MedicineGroupModel} from "../../../models/medicine-group.model";
import {CompanyModel} from "../../../models/company.model";
import {NotificationsService} from 'angular2-notifications';
import {PurchaseCartService} from "../../../services/purchase.cart.service";
import {PurchaseService} from "../../../services/purchase.service";

@Component({
  templateUrl: 'new-purchase.component.html'
})
export class NewPurchaseComponent {

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
              private cartService: PurchaseCartService,
              private purchaseService: PurchaseService,
              private notificationService: NotificationsService
  ) {}


  ngOnInit() {
    this.getMedicine();
  }
  ngDoCheck(){
    let newTotal = 0;
    let newDiscount = 0;
    this.cartService.purchaseItem.forEach((item)=>{
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
        this.cartService.purchaseItem.forEach((item)=>{
          if(item._id == medicine._id){
            avoid = true;
          }
        })
        if(avoid == false){
          this.cartService.purchaseItem.push(salesItem);
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
    this.cartService.status = 1;
    this.purchaseService.newPurchase().subscribe((res) => {
      this.cartService.emptyCart();
      this.notificationService.success('Success', res.msg)
      this.cartService.previousInvoiceNo = res.data.invoiceId;
    })
  }

  updateQty( currentItemId, newQty){
    this.cartService.purchaseItem.forEach((item)=>{
      if(item._id == currentItemId){
        item.qty = newQty;
      }
    })
  }

  updatePrice( currentItemId, newPrice){
    this.cartService.purchaseItem.forEach((item)=>{
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
    this.cartService.purchaseItem.forEach((item)=>{
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
    this.cartService.purchaseItem.forEach((item)=>{
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
    this.cartService.purchaseItem.forEach((item)=>{
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
    this.cartService.purchaseItem.forEach((item)=>{
      if(item._id == currentItemId){
        this.cartService.purchaseItem.splice(index, 1);
      }
      index++;
    })
  }






}
