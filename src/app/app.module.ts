import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';

import { CellService, DynamicTableModule } from 'material-dynamic-table';
import { AppComponent } from './app.component';
import { OptionsCellComponent } from './cells/options-cell/options-cell.component';

@NgModule({
    declarations: [
        AppComponent,
        OptionsCellComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DynamicTableModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatNativeDateModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly cellService: CellService) {
    cellService.registerCell('options', OptionsCellComponent);
  }
}
