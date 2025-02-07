import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SuperheroesController } from "./superheroes/controller";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../public") // Serve files from the public folder for the frontend
		})
	],
	controllers: [SuperheroesController]
})
export class AppModule {}
