import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { CloseHttpClient } from '../transports/httpClient';
import { ClosePaginator } from '../transports/paginator';

export async function executeActivityAction(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const httpClient = new CloseHttpClient(this);
	const paginator = new ClosePaginator(httpClient);

	switch (operation) {
		case 'create':
			return await createActivity.call(this, httpClient, i);
		case 'get':
			return await getActivity.call(this, httpClient, i);
		case 'getAll':
			return await getAllActivities.call(this, httpClient, paginator, i);
		case 'update':
			return await updateActivity.call(this, httpClient, i);
		case 'delete':
			return await deleteActivity.call(this, httpClient, i);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

async function createActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const activityType = this.getNodeParameter('activityType', i) as string;
	const leadId = this.getNodeParameter('leadId', i) as string;

	// Validate required fields
	if (!leadId || leadId.trim() === '') {
		throw new Error('Lead ID is required for creating activities');
	}

	if (!activityType || activityType.trim() === '') {
		throw new Error('Activity type is required');
	}

	const body: any = {
		lead_id: leadId,
	};

	console.log('=== ACTIVITY CREATION DEBUG ===');
	console.log('Activity Type:', activityType);
	console.log('Lead ID:', leadId);
	console.log('Initial Body:', JSON.stringify(body, null, 2));
	console.log('=== END ACTIVITY DEBUG ===');

	switch (activityType) {
		case 'call':
			return await createCallActivity.call(this, httpClient, body, i);
		case 'email':
			return await createEmailActivity.call(this, httpClient, body, i);
		case 'meeting':
			return await createMeetingActivity.call(this, httpClient, body, i);
		case 'note':
			return await createNoteActivity.call(this, httpClient, body, i);
		case 'sms':
			return await createSmsActivity.call(this, httpClient, body, i);
		default:
			throw new Error(
				`Unknown activity type: ${activityType}. Supported types: call, email, meeting, note, sms`,
			);
	}
}

async function createCallActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	body: any,
	i: number,
): Promise<INodeExecutionData[]> {
	const direction = this.getNodeParameter('direction', i) as string;
	const phone = this.getNodeParameter('phone', i, '') as string;
	const note = this.getNodeParameter('note', i, '') as string;
	const duration = this.getNodeParameter('duration', i, 0) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	body.direction = direction;
	if (phone) body.phone = phone;
	if (note) body.note = note;
	if (duration) body.duration = duration;

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.userId) body.user_id = additionalFields.userId;
	// Set date_created only if explicitly specified by user
	if (additionalFields.dateCreated) body.date_created = additionalFields.dateCreated;

	const response = await httpClient.makeRequest('POST', '/activity/call/', body);
	return [{ json: response }];
}

async function createEmailActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	body: any,
	i: number,
): Promise<INodeExecutionData[]> {
	const direction = this.getNodeParameter('direction', i) as string;
	const subject = this.getNodeParameter('subject', i) as string;
	const bodyText = this.getNodeParameter('bodyText', i, '') as string;
	const bodyHtml = this.getNodeParameter('bodyHtml', i, '') as string;
	const to = this.getNodeParameter('to', i) as string[];
	const emailStatus = this.getNodeParameter('emailStatus', i, 'outbox') as string;
	const scheduledDate = this.getNodeParameter('scheduledDate', i, '') as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	body.direction = direction;
	body.subject = subject;
	body.to = to;
	body.status = emailStatus;

	if (bodyText) body.body_text = bodyText;
	if (bodyHtml) body.body_html = bodyHtml;

	// Set scheduled date if status is scheduled
	if (emailStatus === 'scheduled' && scheduledDate) {
		body.date_scheduled = scheduledDate;
	}

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.userId) body.user_id = additionalFields.userId;
	if (additionalFields.cc) body.cc = additionalFields.cc;
	if (additionalFields.bcc) body.bcc = additionalFields.bcc;
	if (additionalFields.sender) body.sender = additionalFields.sender;
	if (additionalFields.templateId) body.template_id = additionalFields.templateId;

	const response = await httpClient.makeRequest('POST', '/activity/email/', body);
	return [{ json: response }];
}

async function createMeetingActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	body: any,
	i: number,
): Promise<INodeExecutionData[]> {
	const title = this.getNodeParameter('title', i) as string;
	const note = this.getNodeParameter('note', i, '') as string;
	const startsAt = this.getNodeParameter('startsAt', i) as string;
	const endsAt = this.getNodeParameter('endsAt', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	body.title = title;
	body.starts_at = startsAt;
	body.ends_at = endsAt;

	if (note) body.note = note;

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.userId) body.user_id = additionalFields.userId;
	if (additionalFields.location) body.location = additionalFields.location;
	if (additionalFields.attendees) body.attendees = additionalFields.attendees;

	const response = await httpClient.makeRequest('POST', '/activity/meeting/', body);
	return [{ json: response }];
}

// Helper function to sanitize HTML for Close.com API
function sanitizeHtmlForClose(html: string): string {
	if (!html) return html;

	// Close.com expects well-formed HTML with specific formatting
	// Based on Close.com documentation: supports subset of HTML for rich-text content

	let sanitized = html.trim();

	// Step 1: Normalize all line breaks to <br> (Close.com prefers <br> over <br/>)
	sanitized = sanitized.replace(/<br\s*\/?>/gi, '<br>');

	// Step 2: Remove multiple consecutive <br> tags - this is the key issue!
	// Replace multiple <br> tags with single <br>
	sanitized = sanitized.replace(/(<br>\s*){2,}/gi, '<br>');

	// Step 3: Remove any trailing <br> tags that might cause "extra content" errors
	sanitized = sanitized.replace(/(<br>\s*)+$/gi, '');

	// Step 4: Remove any leading <br> tags
	sanitized = sanitized.replace(/^(\s*<br>\s*)+/gi, '');

	// Step 5: Ensure proper paragraph structure if using <p> tags
	sanitized = sanitized.replace(/<p>\s*<\/p>/gi, '');

	// Step 6: Remove any extra whitespace between tags that could cause parsing issues
	sanitized = sanitized.replace(/>\s+</g, '><');

	// Step 7: Ensure proper closing of common tags
	sanitized = sanitized.replace(/<(b|i|u|strong|em)([^>]*)>([^<]*)<\/\1>/gi, '<$1$2>$3</$1>');

	// Step 8: Remove any HTML comments that might cause issues
	sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '');

	// Step 9: Final cleanup - ensure the HTML doesn't end with whitespace or extra content
	sanitized = sanitized.trim();

	// Step 10: Special handling for Close.com - ensure content ends properly
	// If the content ends with a tag, make sure there's no trailing whitespace
	if (sanitized.endsWith('>')) {
		// Content ends with a tag, this is good
	} else {
		// Content ends with text, this is also good
		// But make sure there's no trailing whitespace after text
		sanitized = sanitized.replace(/\s+$/, '');
	}

	console.log('=== HTML SANITIZATION ===');
	console.log('Original HTML:', JSON.stringify(html));
	console.log('Sanitized HTML:', JSON.stringify(sanitized));
	console.log('Length change:', html.length, '->', sanitized.length);
	console.log('Ends with tag:', sanitized.endsWith('>'));
	console.log('=== END HTML SANITIZATION ===');

	return sanitized;
}

async function createNoteActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	body: any,
	i: number,
): Promise<INodeExecutionData[]> {
	const useHtml = this.getNodeParameter('useHtml', i, false) as boolean;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	// Use either note or note_html based on checkbox
	if (useHtml) {
		const noteHtml = this.getNodeParameter('noteHtml', i) as string;
		if (!noteHtml || noteHtml.trim() === '') {
			throw new Error('Note HTML content is required when HTML mode is enabled');
		}

		// Sanitize HTML for Close.com API compatibility
		const sanitizedHtml = sanitizeHtmlForClose(noteHtml);

		if (!sanitizedHtml) {
			throw new Error('Note HTML content cannot be empty after sanitization');
		}

		// Test if the HTML is simple enough - if it's just text with basic formatting,
		// we might want to use plain text instead to avoid Close.com HTML parsing issues
		const hasComplexHtml = /<(?!\/?(b|i|u|strong|em|br)(\s|>))/i.test(sanitizedHtml);

		if (hasComplexHtml) {
			console.warn(
				'Complex HTML detected, Close.com might reject this. Consider using plain text.',
			);
		}

		body.note_html = sanitizedHtml;
	} else {
		const note = this.getNodeParameter('note', i) as string;
		if (!note || note.trim() === '') {
			throw new Error('Note content is required');
		}
		body.note = note;
	}

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.userId) body.user_id = additionalFields.userId;
	// Set date_created only if explicitly specified by user
	if (additionalFields.dateCreated) body.date_created = additionalFields.dateCreated;

	const response = await httpClient.makeRequest('POST', '/activity/note/', body);
	return [{ json: response }];
}

async function createSmsActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	body: any,
	i: number,
): Promise<INodeExecutionData[]> {
	const direction = this.getNodeParameter('direction', i) as string;
	const text = this.getNodeParameter('text', i) as string;
	const to = this.getNodeParameter('to', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	body.direction = direction;
	body.text = text;
	body.to = to;

	if (additionalFields.contactId) body.contact_id = additionalFields.contactId;
	if (additionalFields.userId) body.user_id = additionalFields.userId;
	if (additionalFields.from) body.from = additionalFields.from;
	if (additionalFields.templateId) body.template_id = additionalFields.templateId;

	const response = await httpClient.makeRequest('POST', '/activity/sms/', body);
	return [{ json: response }];
}

async function getActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const activityType = this.getNodeParameter('activityType', i) as string;
	const activityId = this.getNodeParameter('activityId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};
	if (additionalFields.fields) {
		qs._fields = additionalFields.fields;
	}

	const response = await httpClient.makeRequest(
		'GET',
		`/activity/${activityType}/${activityId}/`,
		undefined,
		qs,
	);

	return [{ json: response }];
}

async function getAllActivities(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	paginator: ClosePaginator,
	i: number,
): Promise<INodeExecutionData[]> {
	const activityType = this.getNodeParameter('activityType', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 50) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as any;

	const qs: any = {};

	// Filter options
	if (additionalFields.leadId) {
		qs.lead_id = additionalFields.leadId;
	}
	if (additionalFields.contactId) {
		qs.contact_id = additionalFields.contactId;
	}
	if (additionalFields.userId) {
		qs.user_id = additionalFields.userId;
	}
	if (additionalFields.dateFrom) {
		qs.date_created__gte = additionalFields.dateFrom;
	}
	if (additionalFields.dateTo) {
		qs.date_created__lt = additionalFields.dateTo;
	}

	const endpoint = activityType === 'all' ? '/activity/' : `/activity/${activityType}/`;
	const response = await paginator.getAll(endpoint, { returnAll, limit }, qs);

	return response.map((item) => ({ json: item }));
}

async function updateActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const activityType = this.getNodeParameter('activityType', i) as string;
	const activityId = this.getNodeParameter('activityId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as any;

	const body: any = {};

	// Common update fields
	if (updateFields.note !== undefined) body.note = updateFields.note;

	// Activity type specific updates
	switch (activityType) {
		case 'call':
			if (updateFields.duration !== undefined) body.duration = updateFields.duration;
			if (updateFields.direction !== undefined) body.direction = updateFields.direction;
			break;
		case 'email':
			if (updateFields.subject !== undefined) body.subject = updateFields.subject;
			if (updateFields.bodyText !== undefined) body.body_text = updateFields.bodyText;
			if (updateFields.bodyHtml !== undefined) body.body_html = updateFields.bodyHtml;
			break;
		case 'meeting':
			if (updateFields.title !== undefined) body.title = updateFields.title;
			if (updateFields.startsAt !== undefined) body.starts_at = updateFields.startsAt;
			if (updateFields.endsAt !== undefined) body.ends_at = updateFields.endsAt;
			if (updateFields.location !== undefined) body.location = updateFields.location;
			break;
		case 'sms':
			if (updateFields.text !== undefined) body.text = updateFields.text;
			if (updateFields.direction !== undefined) body.direction = updateFields.direction;
			break;
	}

	const response = await httpClient.makeRequest(
		'PUT',
		`/activity/${activityType}/${activityId}/`,
		body,
	);

	return [{ json: response }];
}

async function deleteActivity(
	this: IExecuteFunctions,
	httpClient: CloseHttpClient,
	i: number,
): Promise<INodeExecutionData[]> {
	const activityType = this.getNodeParameter('activityType', i) as string;
	const activityId = this.getNodeParameter('activityId', i) as string;

	await httpClient.makeRequest('DELETE', `/activity/${activityType}/${activityId}/`);

	return [{ json: { success: true, id: activityId } }];
}
