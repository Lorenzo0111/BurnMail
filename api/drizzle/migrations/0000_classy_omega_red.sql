CREATE TABLE `addresses` (
	`email` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`timestamp` integer NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`email`) REFERENCES `addresses`(`email`) ON UPDATE cascade ON DELETE cascade
);
