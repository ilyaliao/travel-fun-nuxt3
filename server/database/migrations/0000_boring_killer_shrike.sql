CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text,
	`tel` text,
	`address` text,
	`role` text DEFAULT 'user',
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text NOT NULL,
	`title` text,
	`price` integer,
	`description` text,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content` text,
	`price` integer NOT NULL,
	`origin_price` integer NOT NULL,
	`image_url` text,
	`images_url` text,
	`address` text,
	`city` text,
	`category` text,
	`coordinates` text,
	`evaluate` real DEFAULT 0,
	`evaluate_num` integer DEFAULT 0,
	`unit` text,
	`features` text,
	`is_enabled` integer DEFAULT 1,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`title` text,
	`percent` integer,
	`due_date` integer,
	`is_enabled` integer DEFAULT 1
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);
