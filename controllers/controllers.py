# # -*- coding: utf-8 -*- 
from odoo import http
from odoo.http import request
class CustomController(http.Controller):

    @http.route('/web/dataset/call_kw', type='json', auth='user', methods=['POST'])
    def call_kw(self, model, method, args, kwargs):
        return http.request.env[model].sudo().with_context(request.context)[method](*args, **kwargs)

# from odoo import http
# 

# class SmartTemplateMaker(http.Controller):
#     @http.route('/', auth='public', website=True)
#     def index(self, **kw):
#         # Fetch the data for the partner_id field from the Odoo backend
#         partners = request.env['res.partner'].sudo().search([])
        
#         # Pass the partners data to the template
#         return http.request.render('smart_template_maker.custom_homepage', {
#             'partners': partners,
#         })
#     @http.route('/get_partner_info', type='json', auth='user')
#     def get_partner_info(self, partner_id):
#             partner = http.request.env['res.partner'].browse(int(partner_id))
#             return {'name': partner.name}


#     @http.route('/smart_template_maker/smart_template_maker/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('smart_template_maker.listing', {
#             'root': '/smart_template_maker/smart_template_maker',
#             'objects': http.request.env['smart_template_maker.smart_template_maker'].search([]),
#         })

#     @http.route('/smart_template_maker/smart_template_maker/objects/<model("smart_template_maker.smart_template_maker"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('smart_template_maker.object', {
#             'object': obj
#         })
