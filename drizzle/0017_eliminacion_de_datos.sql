CREATE TABLE "data_deletion_request" (
	"id" text PRIMARY KEY NOT NULL,
	"confirmation_code" text NOT NULL,
	"meta_user_id" text NOT NULL,
	"status" text DEFAULT 'recibida' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX "data_deletion_code_uq" ON "data_deletion_request" USING btree ("confirmation_code");--> statement-breakpoint
CREATE UNIQUE INDEX "data_deletion_user_abierta_uq" ON "data_deletion_request" USING btree ("meta_user_id") WHERE "data_deletion_request"."status" = 'recibida';