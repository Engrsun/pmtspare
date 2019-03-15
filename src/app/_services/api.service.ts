import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '../../environments/environment';
import {
    Accident,
    ApiResponse,
    Assignment,
    Maintenance,
    Offence,
    PmlWaybill,
    PmtWaybill,
    Rating,
    Schedule,
    Spares,
    SpareCategory,
    SparesLocation,
    SpareLog,
    SpareStock,
    SpareTransfer,
    SpareRequest,
    Staff,
    Terminal,
    Vehicle,
    
 } from '../_models';
import { UtilsService } from './utils.service';

@Injectable({ providedIn: 'root' })

export class ApiService {

   // apiUrl = 'http://192.168.6.147:3000/api'; //environment.PEACE_API;
   apiUrl = 'https://jibrila.herokuapp.com/api';
    constructor(private http: HttpClient, private utilsService: UtilsService) { }

    getAccident(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/accidents${query}`);
    }

    getAssignment(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/vehicle-assignments${query}`);
    }
    getMaintenance(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-maintenances${query}`);
    }

    getOffence(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/offences${query}`);
    }
    getPmlWaybill(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pml-waybills${query}`);
    }

    getPmtWaybill(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-waybills${query}`);
    }
    getRating(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/ratings${query}`);
    }

    getSchedule(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/pmt-schedules${query}`);
    }

    //spares
    getSpares(query = '') {
        return this.http.get<ApiResponse>(`${this.apiUrl}/spares${query}`);
    }
    updateSpares(spares: Spares): Observable<ApiResponse> {
    const id = spares.id;
    delete spares.id;
    const payload = this.utilsService.cleanObject(spares);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spares/${id}`, payload);
   }

   createSpares(spares: Spares): Observable<ApiResponse> {
    delete spares.id;
    const payload = this.utilsService.cleanObject(spares);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spares`, payload);
  }

  deleteSpares(id: Spares['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spares/${id}`);
  }

  getOneSpare(spares, id): Spares {
    return spares.filter(obj => obj.id === id);
  }
  
  //spares category begins
retrieveSpareCategory(query = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spare-categories/${query}`);
}

updateSpareCategory(sparecategory: SpareCategory): Observable<ApiResponse> {
    const id = sparecategory.id;
    delete sparecategory.id;
    const payload = this.utilsService.cleanObject(sparecategory);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spare-categories/${id}`, payload);
}

createSpareCategory(sparecategory: SpareCategory): Observable<ApiResponse> {
    delete sparecategory.id;
    const payload = this.utilsService.cleanObject(sparecategory);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spare-categories`, payload);
}

deleteSpareCategory(id: SpareCategory['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spare-categories/${id}`);
}

getOneSpareCategory(sparecategory, id): SpareCategory {
    return sparecategory.filter(obj => obj.id === id);
}
//spares category ends here

//spares location begins
retrieveSparesLocation(query = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spare-locations/${query}`);
}

updateSparesLocation(spareslocation: SparesLocation): Observable<ApiResponse> {
    const id = spareslocation.id;
    delete spareslocation.id;
    const payload = this.utilsService.cleanObject(spareslocation);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spare-locations/${id}`, payload);
}

createSparesLocation(spareslocation: SparesLocation): Observable<ApiResponse> {
    delete spareslocation.id;
    const payload = this.utilsService.cleanObject(spareslocation);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spare-locations`, payload);
}

deleteSparesLocation(id: SparesLocation['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spare-locations/${id}`);
}

getSparesLocation(spareslocation, id): SparesLocation {
    return spareslocation.filter(obj => obj.id === id);
}
//spares location ends here

//spares log begins
retrieveSpareLog(query = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spare-logs/${query}`);
}

updateSpareLog(sparelog: SpareLog): Observable<ApiResponse> {
    const id = sparelog.id;
    delete sparelog.id;
    const payload = this.utilsService.cleanObject(sparelog);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spare-logs/${id}`, payload);
}

createSpareLog(sparelog: SpareLog): Observable<ApiResponse> {
    delete sparelog.id;
    const payload = this.utilsService.cleanObject(sparelog);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spare-logs`, payload);
}

deleteSpareLog(id: SpareLog['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spare-logs/${id}`);
}

getOneSpareLog(sparelog, id): SpareLog {
    return sparelog.filter(obj => obj.id === id);
}
//spares log ends here

//spares stock begins
retrieveSpareStock(query = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spare-stocks/${query}`);
}

updateSpareStock(sparestock: SpareStock): Observable<ApiResponse> {
    const id = sparestock.id;
    delete sparestock.id;
    const payload = this.utilsService.cleanObject(sparestock);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spare-stocks/${id}`, payload);
}

createSpareStock(sparestock: SpareStock): Observable<ApiResponse> {
    delete sparestock.id;
    const payload = this.utilsService.cleanObject(sparestock);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spare-stocks`, payload);
}

deleteSpareStock(id: SpareStock['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spare-stocks/${id}`);
}

getOneSpareStock(sparestock, id): SpareStock {
    return sparestock.filter(obj => obj.id === id);
}
//spares stock ends here

//spares transfer begins
retrieveSpareTransfer(query = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spare-transfers/${query}`);
}

updateSpareTransfer(sparetransfer: SpareTransfer): Observable<ApiResponse> {
    const id = sparetransfer.id;
    delete sparetransfer.id;
    const payload = this.utilsService.cleanObject(sparetransfer);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spare-transfers/${id}`, payload);
}

createSpareTransfer(sparetransfer: SpareTransfer): Observable<ApiResponse> {
    delete sparetransfer.id;
    const payload = this.utilsService.cleanObject(sparetransfer);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spare-transfers`, payload);
}

deleteSpareTransfer(id: SpareLog['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spare-transfers/${id}`);
}

getOneSpareTransfer(sparetransfer, id): SpareTransfer {
    return sparetransfer.filter(obj => obj.id === id);
}
//spares transfer ends here

//spares request begins
retrieveSpareRequest(query = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spare-requests/${query}`);
}

updateSpareRequest(sparerequest: SpareRequest): Observable<ApiResponse> {
    const id = sparerequest.id;
    delete sparerequest.id;
    const payload = this.utilsService.cleanObject(sparerequest);
    return this.http.put<ApiResponse>(`${this.apiUrl}/spare-requests/${id}`, payload);
}

createSpareRequest(sparerequest: SpareRequest): Observable<ApiResponse> {
    delete sparerequest.id;
    const payload = this.utilsService.cleanObject(sparerequest);
    return this.http.post<ApiResponse>(`${this.apiUrl}/spare-requests`, payload);
}

deleteSpareRequest(id: SpareRequest['id']): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/spare-requests/${id}`);
}

getOneSpareRequest(sparerequest, id): SpareRequest {
    return sparerequest.filter(obj => obj.id === id);
}
//spares request ends here

getStaff(query = '') {
    return this.http.get<ApiResponse>(`${this.apiUrl}/staff${query}`);
}
    // Terminal
    retrieveTerminal(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/terminals${query}`);
    }

    updateTerminal(terminal: Terminal): Observable<ApiResponse> {
        const id = terminal.id;
        delete terminal.id;
        const payload = this.utilsService.cleanObject(terminal);
        return this.http.put<ApiResponse>(`${this.apiUrl}/terminals/${id}`, payload);
    }

    createTerminal(terminal: Terminal): Observable<ApiResponse> {
        delete terminal.id;
        const payload = this.utilsService.cleanObject(terminal);
        return this.http.post<ApiResponse>(`${this.apiUrl}/terminals`, payload);
    }

    deleteTerminal(id: Terminal['id']): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/terminals/${id}`);
    }

    getTerminal(terminals, id): Terminal {
        return terminals.filter(obj => obj.id === id);
    }

    // Vehicle
    getVehicle(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/vehicles${query}`);
    }

    // City, County, State
    retrieveCity(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/cities${query}`);
    }
    retrieveCounty(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/counties${query}`);
    }
    retrieveState(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/states${query}`);
    }
    // staff
    retrieveStaff(query = ''): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/staff/${query}`);
    }
}
