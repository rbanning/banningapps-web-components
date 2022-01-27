import { defineBrandComponent } from './brand.component';
import { defineExpandableDetailsComponent } from './expandable-details.component';
import { defineFooterComponent } from './footer.component';
import { definePopupMenuComponent } from './popup-menu.component';
import { defineProfileCardComponent } from './profile-card.component';
import { defineSiteHeaderComponent } from './site-header.component';
import { defineTooltipComponent } from './tooltip.component';

export const defineComponents = () => {
  defineTooltipComponent();
  defineExpandableDetailsComponent();
  defineProfileCardComponent();

  defineSiteHeaderComponent();
  defineFooterComponent();
  defineBrandComponent();
  definePopupMenuComponent();
}

export * from './tooltip.component';
export * from './expandable-details.component';
export * from './profile-card.component';
export * from './site-header.component';
export * from './footer.component';
export * from './brand.component';
export * from './popup-menu.component';
