import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Entity('web_wrad_foto')
export class FotoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(type => UsuarioEntity, usuarioEntity => usuarioEntity.fotos)
    usuarioId: UsuarioEntity;
}