import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SuperheroesController } from "./superheroes/controller";

@Module({
	imports: [],
	controllers: [SuperheroesController]
})
export class AppModule {}
