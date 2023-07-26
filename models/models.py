# -*- coding: utf-8 -*-

from odoo import models, fields, api


class smart_template_maker(models.Model):
    _name = 'smart.template.maker'
    _description = 'Smart Template Maker'

    name = fields.Char()
    partner_id = fields.Many2one(string='Partner',comodel_name='res.partner',)
    
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
