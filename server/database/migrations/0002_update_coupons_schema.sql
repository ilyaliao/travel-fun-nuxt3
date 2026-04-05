PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_coupons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`value` integer NOT NULL,
	`min_amount` integer DEFAULT 0,
	`is_enabled` integer DEFAULT 1,
	`expires_at` text,
	`created_at` integer
);--> statement-breakpoint
INSERT INTO `__new_coupons`(`id`, `code`, `title`, `type`, `value`, `min_amount`, `is_enabled`)
	SELECT `id`, `code`, COALESCE(`title`, ''), 'percent', COALESCE(100 - `percent`, 10), 0, `is_enabled`
	FROM `coupons`;--> statement-breakpoint
DROP TABLE `coupons`;--> statement-breakpoint
ALTER TABLE `__new_coupons` RENAME TO `coupons`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);
