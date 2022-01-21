import { defineExpandableDetailsComponent } from './expandable-details.component';
import { defineTooltipComponent } from './tooltip.component';

export const defineComponents = () => {
  defineTooltipComponent();
  defineExpandableDetailsComponent();
}

export * from './tooltip.component';
export * from './expandable-details.component';
