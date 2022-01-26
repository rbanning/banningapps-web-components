import { defineExpandableDetailsComponent } from './expandable-details.component';
import { defineProfileCardComponent } from './profile-card.component';
import { defineSiteHeaderComponent } from './site-header.component';
import { defineTooltipComponent } from './tooltip.component';

export const defineComponents = () => {
  defineTooltipComponent();
  defineExpandableDetailsComponent();
  defineProfileCardComponent();

  defineSiteHeaderComponent();
}

export * from './tooltip.component';
export * from './expandable-details.component';
export * from './profile-card.component';
export * from './site-header.component';
