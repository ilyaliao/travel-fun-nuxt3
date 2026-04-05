CREATE TABLE `faqs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`sort_order` integer DEFAULT 0,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text,
	`user_name` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `plans` ADD `includes` text;--> statement-breakpoint
ALTER TABLE `plans` ADD `duration` text;--> statement-breakpoint
ALTER TABLE `plans` ADD `applicable_to` text;--> statement-breakpoint
ALTER TABLE `plans` ADD `cancellation_policy` text;--> statement-breakpoint
ALTER TABLE `products` ADD `usage` text;