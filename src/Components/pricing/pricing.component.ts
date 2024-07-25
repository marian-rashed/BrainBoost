import { Component } from '@angular/core';
import { IPlan } from '../../models/iplan';
import { PlanService } from '../../Services/pricing/plan-service';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { ISubscribtion } from '../../models/isubscribtion';
import { SubscriptionService } from '../../Services/subscription/subscription-service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  public plansLst!: IPlan[];
  private subscriptionData: ISubscribtion = {
    id: 1,
    planId: 1,
    endDate: new Date(),
    isActive: false,
    teacherId: 1,
  };
  constructor(
    private planService: PlanService,
    private paymentService: SubscriptionService
  ) {}
  ngOnInit(): void {
    this.planService.getAllPlans().subscribe((response) => {
      this.plansLst = response;
    });
  }

  handleSubscription(plan: IPlan): void {
    this.subscriptionData.planId = plan.id;

    const date = new Date();
    this.subscriptionData.endDate.setDate(date.getDate());
    this.subscriptionData.teacherId = 1;
    this.subscriptionData.isActive = false;
    this.paymentService
      .createSubscription(this.subscriptionData)
      .subscribe((respose) => {
        console.log(respose.url);
        window.location.href = respose.url;
      });
  }
}
