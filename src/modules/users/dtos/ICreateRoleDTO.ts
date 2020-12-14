import Permission from "../infra/typeorm/entities/Permission";

export default interface ICreateRoleDTO {
    name: string;
    permissions: Permission[];
}