import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface ShippingMethod {
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected shippingMethods: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 5.00 },
    { name: 'Speedy Shipping', price: 15.00 },
    { name: 'Overnight Shipping', price: 25.00 }
  ];
  protected shippingMethod =signal<ShippingMethod>( this.shippingMethods[0]);

  protected quantity = signal<number>(1);

  protected item = {
    name: 'Super Cool Item',
    price: 19.99
  };

  protected itemTotal = computed<number>(() => { return +(this.quantity() * this.item.price).toFixed(2) });
  protected subtotal = computed<number>(() => { return this.itemTotal() });
  protected tax = computed<number>(() => { return +(this.subtotal() * 0.07).toFixed(2) });
  protected shipping = computed<number>(() => { return this.shippingMethod().price });
  protected total = computed<number>(() => { return +(this.subtotal() + this.tax() + this.shipping()).toFixed(2) });

  addToCart() {
    // this.quantity.set(this.quantity() +1);
    this.quantity.update((prev) => prev + 1);
  }

  updateShippingMethod(method: ShippingMethod) {
    // this.shippingMethod = method;
    this.shippingMethod.update((value) => value = method);

  }
}
