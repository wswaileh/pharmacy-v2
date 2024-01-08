export interface IBaseModel<EntityReadDTO, EntityWriteDTO> {

  ID_ATTR_NAME: string;

  fromDTO(input: EntityReadDTO);
  toDTO(): EntityWriteDTO;

  clone(): IBaseModel<EntityReadDTO, EntityWriteDTO>;
}

export interface IBaseDTO {}
