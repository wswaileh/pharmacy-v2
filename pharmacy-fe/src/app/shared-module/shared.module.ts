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
// Components
import { EntityButtonsComponent } from './entity-buttons/entity-buttons.component';
import { EntityContextMenuComponent } from './entity-context-menu/entity-context-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WSidebarComponent } from './w-sidebar/w-sidebar.component';

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
  AutoCompleteModule
];

const components = [
  NavbarComponent,
  WSidebarComponent,
  EntityButtonsComponent,
  EntityContextMenuComponent
];

@NgModule({
  declarations: components,
  imports: [CommonModule, ...modules],
  exports: [...modules, ...components],
  providers: [ConfirmationService, MessageService]
})
export class SharedModule { }
