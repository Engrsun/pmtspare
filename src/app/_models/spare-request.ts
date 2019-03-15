
export class SpareRequest {
    id: string;
    code: string;
    pmt_maintenance_id:	string;
    spare_id: string;
    quantity: Number;
    request_date: Date;
    user_type:	string;
    recipient_staff_id:	string;
    recipient_driver_id: string;
    vehicle_id:	string;
    description:string;
    approved_date: Date;
    approved_by: string	;
    issued_date: Date;
    issued_by:	string;
    issuer_remark: string;
    location_id: string;
    request_status:	string;
    issue_status: string;
}