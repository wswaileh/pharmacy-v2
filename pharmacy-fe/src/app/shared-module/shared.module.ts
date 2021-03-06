import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// primeng
import { AccordionModule } from 'primeng/accordion'; // accordion and accordion tab
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';

// Components
import { EntityButtonsComponent } from './entity-buttons/entity-buttons.component';
import { EntityContextMenuComponent } from './entity-context-menu/entity-context-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WSidebarComponent } from './w-sidebar/w-sidebar.component';
import { UniqueValidatorDirective } from '../_directives/unique-validator.directive';

const modules = [
  FormsModule,
  AccordionModule,
  MenubarModule,
  InputTextModule,
  ButtonModule,
  TableModule,
  CalendarModule,
  SliderModule,
  DialogModule,
  MultiSelectModule,
  ContextMenuModule,
  DropdownModule,
  ButtonModule,
  ToastModule,
  InputTextModule,
  ProgressBarModule,
  FileUploadModule,
  ToolbarModule,
  RatingModule,
  RadioButtonModule,
  InputNumberModule,
  ConfirmDialogModule,
  InputTextareaModule,
  TooltipModule,
  TieredMenuModule,
  AutoCompleteModule,
  OverlayPanelModule,
  BlockUIModule,
  ProgressSpinnerModule,
  BadgeModule
];

const components = [
  NavbarComponent,
  WSidebarComponent,
  EntityButtonsComponent,
  EntityContextMenuComponent
];

const directives = [
  UniqueValidatorDirective
];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
    ...directives
  ],
  providers: [ConfirmationService, MessageService]
})
export class SharedModule { }
