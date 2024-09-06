CREATE TABLE `addresses` (
	`email` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`timestamp` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`timestamp` integer DEFAULT (CURRENT_TIMESTAMP),
	`title` text NOT NULL,
	`body` text NOT NULL,
	`html` text NOT NULL,
	FOREIGN KEY (`email`) REFERENCES `addresses`(`email`) ON UPDATE cascade ON DELETE cascade
);
